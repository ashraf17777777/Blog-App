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
  await db.sync({ alter: true });
  console.log("Database & tables synced! 🏗️");

  // 3. دلوقتي تقدر تضيف بيانات وأنت مطمن إن الجدول متبني
  // try {
  //   const testBlog = await Blog.create({
  //     title: "MyFirstBlog",
  //     content: "This is the content of my first blog post.",
  //     UserId: 1, // تأكد إن في مستخدم بالـ ID ده موجود
  //   });
  //   console.log("Test blog created! �", testBlog.id);
  // } catch (err) {
  //   console.log("Blog might already exist, skipping create.", err.message);
  // }

  app.use("/auth", authRouter);
  app.use("/users", userRouter);
  app.use("/blogs", blogRouter);

  app.use((req, res) => {
    res.status(404).json({ message: "404 Not Found" });
  });
};
export default bootstrap;
