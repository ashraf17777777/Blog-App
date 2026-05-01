import { db } from "../../db/connect.js";
import { DataTypes } from "sequelize";
import { Blog } from "./blog.model.js";

export const Person = db.define("User", {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Blog.belongsTo(Person);
Person.hasMany(Blog);
