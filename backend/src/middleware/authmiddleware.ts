import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export async function authfunc(c: Context, next: Next) {
  try {
    const authheader = c.req.header("Authorization") || "";
    if (!authheader) {
      return c.json({ message: "unauthorized user" }, 403);
    }
    const user = await verify(authheader, c.env.SECRET_KEY);
    if (!user) {
      return c.json({ message: "you are not logged in" }, 403);
    }
    c.set("userid", user.id);
    await next();
    return c.res;
  } catch (e) {
    c.status(403);
    return c.json({
      message: "unauthorized access",
    });
  }
}
