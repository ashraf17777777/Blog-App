import { DataTypes } from "sequelize";
import { db } from "../../db/connect.js";

export const Blog = db.define("blog", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
      isAlphanumeric: true,
      len: {
        args: [3, 20],
        msg: "Title must be between 3 and 20 characters",
      },
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },
});
