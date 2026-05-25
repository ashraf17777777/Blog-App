import { db } from "../../db/connect.js";
import { DataTypes } from "sequelize";
import { Blog } from "./blog.model.js";

export const Person = db.define("User", {
  firstName: {
    field: "first_name",
    // field ده بيخلي اسم العمود في الداتا بيز يختلف عن اسم الخاصية في الكود
    // يعني في الكود هنستخدم person.firstName لكن في الداتا بيز العمود هيكون first_name
    // ده بيخلي الكود أنظف وأسهل في القراءة، وفي نفس الوقت بنحافظ على قواعد تسمية الأعمدة في الداتا بيز
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 10],
        msg: "First name must be between 3 and 10 characters long",
      },
      checkName(value) {
        if (value.toUpperCase() === "admin") {
          throw new Error("Name cannot be 'admin'");
        }
      },
    },
    get() {
      const rawValue = this.getDataValue("first_name");
      return rawValue ? rawValue.toUpperCase() : null;
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notNull: true,
      notEmpty: true,
      set(value) {
        this.setDataValue("email", value.toLowerCase());
        // this هنا بتشير للـ instance الحالي من الـ model، يعني لما نعمل person.setEmail
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
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
      notNull: true,
    },
    set(value) {
      const dobDate = new Date(value);
      const dobYear = dobDate.getFullYear();
      const now = new Date();
      const getCurrentYear = now.getFullYear();
      this.setDataValue("age", getCurrentYear - dobYear);
      this.setDataValue("dob", value); // طالاما عملت setter ومعملتش سيت لل dob هيحصل pause لان استخدمنا الفاليو بتاعت ال dob و مقلناش هتكون ب قد ايه
      // لما نعمل person.setDob("1990-01-01")، الكود ده هيحسب السن ويخزنه في عمود الـ age كمان
      // يعني في الداتا بيز هيكون عندنا عمودين: dob و age، والسن هيتحسب أوتوماتيك بناءً على تاريخ الميلاد اللي بندخله
    },
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Blog.belongsTo(Person);
Person.hasMany(Blog);
