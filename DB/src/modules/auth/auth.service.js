import { db } from "../../../db/connect.js";
import { Person } from "../../modules/user/user.controller.js";

// bulkCreate method to create multiple users at once
export const registerLogic = async (req, res) => {
  try {
    const { first_name, email, password } = req.body;
    const users = await Person.bulkCreate([
      // array of objects
      { first_name, email, password },
      {
        first_name: "John",
        email: "john@example.com",
        password: "password123",
      },
    ]);
    res.status(201).json({ message: "Users Created", users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login logic using Sequelize ORM
export const loginLogic = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Person.findOne({
      where: {
        email,
        password,
      },
      // instead of writting email: req.body.email, as the key is the same name as the value so benkhtesr
    });
    if (user.email !== email) {
      return res.status(401).json({ message: "Invalid email or password ❌" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password ❌" });
    }
    res.status(201).json({ msg: "User Logged In Successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// First Method

// export const registerLogic = async (req,res) => {
//     const {first_name,email,password} = req.body;
//     const user = await Person.build({first_name,email,password})
//     await user.save() // save user to database
//     res.status(201).json({message: "User Created",user})
// }

// Second Method

// export const registerLogic = async (req, res) => {
//   const { first_name, email, password } = req.body;
//   const user = await new Person({ first_name, email, password });
//   await user.save();
//   res.status(201).json({ msg: "User Created", user });
// };

// Third Method (recommended)

// export const registerLogic = async (req, res) => {
//   const { first_name, email, password } = req.body;
//   const user = await Person.create({ first_name, email, password });
//   res.status(201).json({ msg: "User Created", user });
// };

//------------------------- old way with SQL queries and no ORM, now we are using Sequelize in auth.service.js ---------------------------------------------------------------

// // Register logic is now in auth.service.js to keep the controller clean and focused on handling requests and responses.
// export const registerLogic = (req, res) => {
//   const { full_name, email, password, DOB } = req.body;
//   let query = `INSERT INTO users (full_name, email, password, DOB) VALUES (?, ?, ?, ?)`;
//   db.execute(query, [full_name, email, password, DOB], (err, result) => {
//     if (err) return res.status(500).json({ message: err.message });
//     return res
//       .status(200)
//       .json({ message: "User registered successfully", result });
//   });
// };

// // login logic is now in auth.service.js to keep the controller clean and focused on handling requests and responses.
// export const loginLogic = (req, res) => {
//   const { email } = req.body;
//   let query = `SELECT * FROM users WHERE email = ?`;
//   db.execute(query, [email], (err, result) => {
//     if (err) return res.status(500).json({ message: err.message });
//     if (result.length > 0) {
//       return res
//         .status(200)
//         .json({ message: "User logged in successfully ✅", user: result[0] });
//     }
//     return res.status(401).json({ message: "Invalid email or password ❌" });
//   });
// };
