import { Hono } from "hono";
import {
  getblog,
  getallblogs,
  deleteblog,
  createblog,
  updateblog,
} from "../controller/blog";
import { authfunc } from "../middleware/authmiddleware";

export const blogrouter = new Hono();

blogrouter.post("/", authfunc, createblog);
blogrouter.put("/", authfunc, updateblog);
blogrouter.get("/:id", getblog);
blogrouter.get("/all", getallblogs);
blogrouter.delete("/:id", authfunc, deleteblog);
