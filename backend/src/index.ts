import { Hono } from "hono";
import { cors } from "hono/cors";
import { userrouter } from "./routes/user-routes";
import { blogrouter } from "./routes/blog-routes";

const app = new Hono().basePath("/api/v1");
app.use(cors());

app.route("/user", userrouter);
app.route("/blog", blogrouter);

export default app;
