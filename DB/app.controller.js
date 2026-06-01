import authRouter from "./src/modules/auth/auth.controller.js";
import userRouter from "./src/modules/user/user.controller.js";
import blogRouter from "./src/modules/blog/blog.controller.js   ";
import { connectDb } from "./db/connect.js";
import { Person } from "./db/models/user.model.js";
import { Blog } from "./db/models/blog.model.js";
import { db } from "./db/connect.js";

const bootstrap = async (app, express) => {
  app.use(express.json());

  await connectDb(); // 1. افتح الاتصال الأول

  // 2. السطر ده هو "السر" .. لازم يحصل هنا بعد ما عملنا Import لـ Person فوق
  await db.sync();
  console.log("Database & tables synced! 🏗️");

  Blog.belongsTo(Person, { foreignKey: "UserId" });
  Person.hasMany(Blog, { foreignKey: "UserId" });

  app.use("/auth", authRouter);
  app.use("/users", userRouter);
  app.use("/blogs", blogRouter);

  app.use((req, res) => {
    res.status(404).json({ message: "404 Not Found" });
  });
};
export default bootstrap;
