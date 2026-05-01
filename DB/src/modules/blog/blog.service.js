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
    const { title, content, UserId } = req.body;
    const user = await Person.findByPk(UserId);
    if (!user) return res.status(404).json({ message: "User Not Found" });
    const blog = await Blog.findByPk(blog_id);
    if (!blog) return res.status(404).json({ message: "Blog Not Found" });
    const updatedBlog = await blog.update(
      { title, content },
      { where: { UserId } },
    );
    res
      .status(200)
      .json({ status: "Success", message: "Blog Updated", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Blog Creation Logic using SQL Query

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
