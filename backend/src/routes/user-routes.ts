import { Hono } from "hono";
import { signup, signin } from "../controller/users";

export const userrouter = new Hono();

userrouter.post("/signup", signup);

userrouter.post("/signin", signin);
