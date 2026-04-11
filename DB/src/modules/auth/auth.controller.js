import { Router } from "express";
import * as authService from "./auth.service.js";
const authRouter = Router();

authRouter.post("/register", authService.registerLogic);
authRouter.post("/login", authService.loginLogic);

export default authRouter;
