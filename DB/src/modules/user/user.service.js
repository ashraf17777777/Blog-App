import { db } from "../../../db/connect.js";

// 1. جلب بيانات مستخدم معين (Get User)
export const getUserLogic = (req, res) => {
  const { userId } = req.params;
  let query = `SELECT * FROM users WHERE id = ?`;
  db.execute(query, [userId], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.length == 0)
      return res
        .status(404)
        .json({ status: "failed", message: "User Not Found" });
    return res.status(200).json({ status: "success", result });
  });
};

// 2. تحديث بيانات المستخدم (Update User)
export const updateUserLogic = (req, res) => {
  const { id } = req.params;
  const { full_name } = req.body;
  if (!full_name)
    return res.status(400).json({ message: "Full name is required!" });
  const query = `UPDATE users SET full_name = ? WHERE id = ?`;
  db.execute(query, [full_name, id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows == 0)
      return res.status(404).json({ message: "User Not Found" });
    return res.status(200).json({
      status: "success",
      message: "user updated successfully",
      result,
    });
  });
};

// 3. حذف مستخدم (Delete User)
export const deleteUserLogic = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM users WHERE id = ?`;
  db.execute(query, [id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows == 0)
      return res.status(404).json({ message: "User Not Found" });
    return res.status(200).json({
      status: "success",
      message: "user deleted successfully",
      result,
    });
  });
};

// 4. البحث عن مستخدمين بالاسم (Search Users by Name)
export const searchUserLogic = (req, res) => {
  const { full_name } = req.body;
  const query = `SELECT * FROM users WHERE full_name LIKE ?`;
  db.execute(query, [full_name + "%"], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.length == 0)
      return res.status(404).json({ message: "User Not Found" });
    return res.status(200).json({ status: "success", users: result });
  });
};
