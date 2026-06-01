import { Router } from "express";
import * as blogService from "./blog.service.js";
const blogRouter = Router();

blogRouter.get("/all", blogService.getAllBlogsLogic);
blogRouter.post("/create", blogService.createBlogLogic);
blogRouter.patch("/:blog_id", blogService.updateBlogLogic);
blogRouter.delete("/:blog_id", blogService.deleteBlogLogic);
blogRouter.get("/:blog_id", blogService.getSpecificBlogLogic);

export default blogRouter;
