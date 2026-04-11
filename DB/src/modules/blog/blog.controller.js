import { Router } from "express";
import * as blogService from "./blog.service.js";
const blogRouter = Router();

blogRouter.post("/create", blogService.createBlogLogic);
blogRouter.patch("/:blog_id", blogService.updateBlogLogic);
blogRouter.delete("/:blog_id", blogService.deleteBlogLogic);
blogRouter.get("/:blog_id", blogService.getBlogLogic);

export default blogRouter;
