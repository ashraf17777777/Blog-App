import db from "../../../db/connect.js";

// Register logic is now in auth.service.js to keep the controller clean and focused on handling requests and responses.
export const registerLogic = (req, res) => {
  const { full_name, email, password, DOB } = req.body;
  let query = `INSERT INTO users (full_name, email, password, DOB) VALUES (?, ?, ?, ?)`;
  db.execute(query, [full_name, email, password, DOB], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    return res
      .status(200)
      .json({ message: "User registered successfully", result });
  });
};

// login logic is now in auth.service.js to keep the controller clean and focused on handling requests and responses.
export const loginLogic = (req, res) => {
  const { email } = req.body;
  let query = `SELECT * FROM users WHERE email = ?`;
  db.execute(query, [email], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.length > 0) {
      return res
        .status(200)
        .json({ message: "User logged in successfully ✅", user: result[0] });
    }
    return res.status(401).json({ message: "Invalid email or password ❌" });
  });
};
