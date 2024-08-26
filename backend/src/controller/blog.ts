import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createblogSchema, updateblogSchema } from "@eulerbutcooler/proj-common";

export async function createblog(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const userid = await c.get("userid");
    const body = await c.req.json();
    const {success} = createblogSchema.safeParse(body)
    if(!success){
      c.status(411)
      return c.json({
        message: "incorrect input"
      })
    }
    const blogg = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: Number(userid),
        published: true
      },
    });
    return c.json({
      id: blogg.id,
    });
  } catch (e) {
    c.status(404);
    console.log(e);
    return c.text("couldn't create the blog");
  }
}

export async function getallblogs(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const allblogs = await prisma.blog.findMany({
      where: {
        published: true
      },
      include: {
        author: {
          select: {
            username: true
          }
        }
      }
    });
    return c.json({allblogs});
  } catch (e) {
    c.status(400);
    return c.json({
      message: "internal server error",
    });
  }
}

export async function getblog(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id = c.req.param("id");
    const blog = await prisma.blog.findUnique({
      where: {
        id,
        published: true
      }, include: {
        author: {
          select: {
            username:true
          }
        }
      }
    });
    return c.json(blog);
  } catch (e) {
    c.status(400);
    return c.json({
      message: "no blog found",
    });
  }
}

export async function updateblog(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userid = c.get("userid");

  try {
    const body = await c.req.json();
    const {success} = updateblogSchema.safeParse(body)
    if(!success){
      c.status(411)
      return c.json({
        message: "incorrect input"
      })
    }
    const blogexists = await prisma.blog.findFirst({
      where: {
        id: body.id,
        authorId: Number(userid),
      },
    });
    if (blogexists) {
      await prisma.blog.update({
        where: {
          id: body.id,
          authorId: Number(userid),
        },
        data: {
          title: body.title,
          content: body.content,
          published: true
        },
      });
      return c.text("updated the blog");
    } else {
      return c.text("blog doesn't exist");
    }
  } catch (e) {
    c.status(400);
    return c.text("couldn't update the post");
  }
}

export async function deleteblog(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userid = c.get("userid");
  try {
    const idpost = c.req.param("id");
    await prisma.blog.delete({
      where: {
        id: idpost,
        authorId: Number(userid),
      },
    });
    return c.text("blog deleted");
  } catch (e) {
    c.status(404);
    return c.text("couldn't delete the blog");
  }
}
