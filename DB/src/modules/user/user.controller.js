import { Router } from "express";
import * as userService from "./user.service.js";
const userRouter = Router();

userRouter.get("/:userId", userService.getUserLogic);
userRouter.patch("/update/:id", userService.updateUserLogic);
userRouter.delete("/delete/:id", userService.deleteUserLogic);
userRouter.post("/search", userService.searchUserLogic);

export default userRouter;
