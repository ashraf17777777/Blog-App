import db from "../../../db/connect.js";

// 1) Blog Creation Logic
export const createBlogLogic = (req, res) => {
  const { title, body, user_id } = req.body;
  db.execute(`SELECT * FROM users WHERE id = ?`, [user_id], (err, result) => {
    if (result.length == 0)
      return res.status(404).json({ message: "User Not Found" });
    db.execute(
      `INSERT INTO blog (title, body, user_id) VALUES (?,?,?)`,
      [title, body, user_id],
      (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        return res.status(200).json({ message: "Blog added", result });
      },
    );
  });
};

// 2) Blog Update Logic
export const updateBlogLogic = (req, res) => {
  const { blog_id } = req.params;
  const { title, body, user_id } = req.body;
  let query =
    "UPDATE blog SET title = ?, body = ? WHERE id = ? AND user_id = ?";
  db.execute(query, [title, body, blog_id, user_id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows == 0)
      return res.status(404).json({ message: "Blog Not Found" });
    return res
      .status(200)
      .json({ status: "Success", message: "Updated", result });
  });
};

// 3) Blog Deletion Logic
export const deleteBlogLogic = (req, res) => {
  const { blog_id } = req.params;
  const { user_id } = req.body;
  db.execute(
    `DELETE FROM blog WHERE id = ? AND user_id = ?`,
    [blog_id, user_id],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      if (result.affectedRows == 0)
        return res.status(404).json({ message: "Blog Not Found" });
      return res.status(200).json({ status: "Success", message: "Deleted" });
    },
  );
};

// 4) Blog Retrieval Logic
export const getBlogLogic = (req, res) => {
  const { blog_id } = req.params;
  const { user_id } = req.body;
  db.execute(
    `SELECT * FROM blog WHERE id = ? AND user_id = ?`,
    [blog_id, user_id],
    (err, result) => {
      if (result.length == 0)
        return res.status(404).json({ message: "Blog Not Found" });
      return res.status(200).json({ status: "Success", result });
    },
  );
};
