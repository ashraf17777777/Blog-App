import { DataTypes } from "sequelize";
import { db } from "../../db/connect.js";

export const Blog = db.define(
  "blog",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        len: {
          args: [3, 20],
          msg: "Title must be between 3 and 20 characters",
        },
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    isDeleted: {
      // ده غير ال deletedAt اللي بيضيفه paranoid، ده حقل خاص بينا بنستخدمه في الكود عشان نحدد إذا البوست محذوف ولا لأ (لما يكون true يعني محذوف)
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false, // ده بيخلي الحقل ده لازم يكون موجود في كل سجل، ولو ما حطيناش قيمة هياخد القيمة الافتراضية false
    },
  },
  {
    timestamps: true, // ده بيضيف createdAt و updatedAt أوتوماتيك
    paranoid: true, // ده بيضيف deletedAt وبيخلي الحذف "soft delete"
  },
);
