import authRouter from "./src/modules/auth/auth.controller.js";
import userRouter from "./src/modules/user/user.controller.js";
import blogRouter from "./src/modules/blog/blog.controller.js   ";

const bootstrap = async (app, express) => {
  app.use(express.json());
  app.use("/auth", authRouter);
  app.use("/users", userRouter);
  app.use("/blogs", blogRouter);
  app.use("*", (req, res) =>
    res.status(404).json({ message: "Route not found" }),
  );
};
export default bootstrap;
