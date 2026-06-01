import { db } from "../../../db/connect.js";
import { Person } from "../../../db/models/user.model.js";
import { Blog } from "../../../db/models/blog.model.js";

// Blog Creation Logic using Sequelize ORM

export const createBlogLogic = async (req, res) => {
  try {
    const { title, content, UserId } = req.body;
    const user = await Person.findByPk(UserId);
    if (!user) return res.status(404).json({ message: "User Not Found" });
    const blog = await Blog.create({ title, content, UserId });
    res.status(201).json({ status: "Success", message: "Blog Created", blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Blog Update Logic using Sequelize ORM

export const updateBlogLogic = async (req, res) => {
  try {
    const { blog_id } = req.params;
    const { title, content, UserId } = req.body; // هنا استخرجناهم صح بـ req

    // 1. نتأكد إن الـ User موجود في السيستم أصلاً
    const user = await Person.findByPk(UserId);
    if (!user) return res.status(404).json({ message: "User Not Found" });

    // 2. نجيب البلوج من الداتابيز
    const blog = await Blog.findByPk(blog_id);
    if (!blog) return res.status(404).json({ message: "Blog Not Found" });

    // 3. 🛡️ خطوة الأمان السحرية: نتشيك هل هو صاحب البلوج؟
    // بنقارن الـ UserId المتخزن في البلوج جوه الداتابيز، بالـ UserId اللي مبعوت في الطلب
    if (blog.UserId !== Number(UserId)) {
      return res.status(403).json({
        message: "Unauthorized ❌ You are not the owner of this blog!",
      });
    }

    // 4. طالما عدى من الشرط، يبقى هو صاحبها فعلاً، نحدث وإحنا مطمنين
    const updatedBlog = await blog.update({
      title,
      content,
    });

    res
      .status(200)
      .json({ status: "Success", message: "Blog Updated", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Blog For a Specific User using Sequelize ORM
// الـ Route بتاعك المفروض يبقى كده: router.get("/blog/:blog_id", getSpecificBlog);
export const getSpecificBlogLogic = async (req, res) => {
  try {
    // 1. بناخد الـ ID من الـ params بشكل أنظف وأسهل في الـ URL
    const { blog_id } = req.params;

    // 2. بنجيب البلوج مباشرة
    const blog = await Blog.findByPk(blog_id);

    // 3. لو مش موجودة ارفع كارت أحمر
    if (!blog) {
      return res.status(404).json({ message: "Blog not found ❌" });
    }

    // 4. رجع البلوج بسلام
    res.status(200).json({
      status: "success",
      message: "Blog found ✅",
      blog,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Blog Deletion Logic using Sequelize ORM
export const deleteBlogLogic = async (req, res) => {
  try {
    const { UserId } = req.body;
    const { blog_id } = req.params;
    const blog = await Blog.findByPk(blog_id);
    if (!blog) return res.status(404).json({ message: "Blog Not Found" });
    const user = await Person.findByPk(UserId);
    if (!user) return res.status(404).json({ message: "User Not Found" });
    if (blog.UserId !== Number(UserId)) {
      return res.status(403).json({
        message: "Unauthorized ❌ You are not the owner of this blog!",
      });
    }

    const deleteBlog = await Blog.destroy({ where: { id: blog_id } });
    return res
      .status(200)
      .json({ status: "Success", message: "Blog Deleted", deleteBlog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Blogs
export const getAllBlogsLogic = async (req, res) => {
  try {
    // بنقول للـ Sequelize: هات كل البلوجات واعمل Include لموديل الـ Person مع كل بلوج
    const blogs = await Blog.findAll({
      include: {
        model: Person,
        attributes: ["id", "firstName", "email"], // 🌟 حركة صايعة: بنحدد الحقول اللي عايزينها بس عشان مانرجعش الباسورد!
      },
    });

    res.status(200).json({ status: "Success", results: blogs.length, blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Without Sequelize ORM (Using SQL Queries)
// // 1) Blog Creation Logic
// export const createBlogLogic = (req, res) => {
//   const { title, body, user_id } = req.body;
//   db.execute(`SELECT * FROM users WHERE id = ?`, [user_id], (err, result) => {
//     if (result.length == 0)
//       return res.status(404).json({ message: "User Not Found" });
//     db.execute(
//       `INSERT INTO blog (title, body, user_id) VALUES (?,?,?)`,
//       [title, body, user_id],
//       (err, result) => {
//         if (err) return res.status(500).json({ message: err.message });
//         return res.status(200).json({ message: "Blog added", result });
//       },
//     );
//   });
// };

// // 2) Blog Update Logic
// export const updateBlogLogic = (req, res) => {
//   const { blog_id } = req.params;
//   const { title, body, user_id } = req.body;
//   let query =
//     "UPDATE blog SET title = ?, body = ? WHERE id = ? AND user_id = ?";
//   db.execute(query, [title, body, blog_id, user_id], (err, result) => {
//     if (err) return res.status(500).json({ message: err.message });
//     if (result.affectedRows == 0)
//       return res.status(404).json({ message: "Blog Not Found" });
//     return res
//       .status(200)
//       .json({ status: "Success", message: "Updated", result });
//   });
// };

// // 3) Blog Deletion Logic
// export const deleteBlogLogic = (req, res) => {
//   const { blog_id } = req.params;
//   const { user_id } = req.body;
//   db.execute(
//     `DELETE FROM blog WHERE id = ? AND user_id = ?`,
//     [blog_id, user_id],
//     (err, result) => {
//       if (err) return res.status(500).json({ message: err.message });
//       if (result.affectedRows == 0)
//         return res.status(404).json({ message: "Blog Not Found" });
//       return res.status(200).json({ status: "Success", message: "Deleted" });
//     },
//   );
// };

// // 4) Blog Retrieval Logic
// export const getBlogLogic = (req, res) => {
//   const { blog_id } = req.params;
//   const { user_id } = req.body;
//   db.execute(
//     `SELECT * FROM blog WHERE id = ? AND user_id = ?`,
//     [blog_id, user_id],
//     (err, result) => {
//       if (result.length == 0)
//         return res.status(404).json({ message: "Blog Not Found" });
//       return res.status(200).json({ status: "Success", result });
//     },
//   );
// };
