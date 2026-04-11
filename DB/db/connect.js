import { createConnection } from "mysql2";

const db = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "myblog",
});

db.connect((err) => {
  if (err) return console.log("Database connection error: " + err.message);
  console.log("Database connected successfully! ✅");
});

export default db;
