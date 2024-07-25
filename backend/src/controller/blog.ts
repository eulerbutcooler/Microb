import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export async function createblog(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const userid = await c.get("userid");
    const body = await c.req.json();
    const blogg = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: Number(userid),
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
  console.log("inside the func");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    console.log("trying prisma command");
    const allblogs = await prisma.blog.findMany();
    console.log("prisma command done");
    return c.json(allblogs);
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
      },
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
    const blogexists = await prisma.blog.findFirst({
      where: {
        id: body.id,
        authorId: Number(userid),
      },
    });
    console.log("exists or not");
    if (blogexists) {
      const updatedblog = await prisma.blog.update({
        where: {
          id: body.id,
          authorId: Number(userid),
        },
        data: {
          title: body.title,
          content: body.content,
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
