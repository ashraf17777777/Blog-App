import { Sequelize } from "sequelize";

// إنشاء اتصال مع الداتا بيز (اسم الداتا بيز، اليوزر، الباسورد)
export const db = new Sequelize("myblog3", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export const connectDb = async function () {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully. ✅");
  } catch (error) {
    console.error("Unable to connect to the database: ❌", error);
  }
};

// السطر ده مهم عشان يكريت الجداول أوتوماتيك لو مش موجودة
export const syncTable = async function () {
  try {
    await db.sync();
    console.log("All models were synchronized successfully. ✅");
  } catch (error) {
    console.error("Error occurred while synchronizing models: ❌", error);
  }
};

// import { createConnection } from "mysql2";

// const db = createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "myblog",
// });

// db.connect((err) => {
//   if (err) return console.log("Database connection error: " + err.message);
//   console.log("Database connected successfully! ✅");
// });

// export default db;
