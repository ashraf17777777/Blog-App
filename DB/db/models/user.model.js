import { db } from "../../db/connect.js";
import { DataTypes } from "sequelize";

export const Person = db.define("User", {
  firstName: {
    field: "first_name",
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 10],
        msg: "First name must be between 3 and 10 characters long",
      },
      checkName(value) {
        // 🌟 ظبطناها كابيتال عشان تطابق الـ toUpperCase
        if (value.toUpperCase() === "ADMIN") {
          throw new Error("Name cannot be 'admin'");
        }
      },
    },
    get() {
      const rawValue = this.getDataValue("firstName");
      return rawValue ? rawValue.toUpperCase() : null;
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false, // 🌟 دي لوحدها كافية تمنع الـ null من غير زيادة جوه الـ validate
    unique: true,
    validate: {
      isEmail: {
        msg: "Please provide a valid email address",
      },
      notEmpty: true,
    },
    set(value) {
      this.setDataValue("email", value.toLowerCase());
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: {
        args: [4, 10],
        msg: "Password must be between 4 and 10 characters",
      },
    },
  },
  gender: {
    type: DataTypes.ENUM("male", "female"),
    defaultValue: "male",
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
    },
    set(value) {
      const dobDate = new Date(value);
      const dobYear = dobDate.getFullYear();
      const now = new Date();
      const getCurrentYear = now.getFullYear();
      this.setDataValue("age", getCurrentYear - dobYear);
      this.setDataValue("dob", value);
    },
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
