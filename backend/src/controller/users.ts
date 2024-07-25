import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signupSchema, signinSchema } from "../zod/zodschema";
import { hashPassword, verifyPassword } from "../middleware/hashing";
import { sign } from "hono/jwt";

export async function signup(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const validated = signupSchema.safeParse(body);
    if (!validated.success) {
      return c.json({ error: "invalid data input" }, 400);
    }
    const existingUsername = await prisma.user.findUnique({
      where: { username: validated.data.username },
    });
    if (existingUsername) {
      return c.json({ error: "username already exists" }, 400);
    }
    const existingEmail = await prisma.user.findUnique({
      where: { email: validated.data.email },
    });
    if (existingEmail) {
      return c.json({ error: "email already in use" }, 400);
    }

    const hashedPassword = await hashPassword(validated.data.password);
    const user = await prisma.user.create({
      data: {
        email: validated.data.email,
        password: hashedPassword,
        username: validated.data.username,
      },
    });
    console.log('adding data done')
    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.SECRET_KEY
    );
    return c.text(jwt);
  } catch (e) {
    c.status(411);
    return c.text("invalid request");
  }
}

export async function signin(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const validated = signinSchema.safeParse(body);
    if (!validated.success) {
      return c.json({ error: "invalid data input" }, 400);
    }

    const userexists = await prisma.user.findUnique({
      where: { username: validated.data.username },
    });
    if (!userexists) {
      return c.json({ error: "user doesn't exist" }, 404);
    }

    const isPasswordValid = await verifyPassword(
      validated.data.password,
      userexists.password
    );

    if (!isPasswordValid) {
      return c.json({ error: "invalid credentials" }, 401);
    }

    const jwt = await sign({ id: userexists.id }, c.env.SECRET_KEY);
    return c.text(jwt);
  } catch (e) {
    c.status(411);
    return c.text("Invalid request");
  }
}
