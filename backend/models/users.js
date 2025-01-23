import { Schema, model } from "mongoose";

const userSchema = new Schema(
   {
      name: { type: String, required: [true, "User should have a name"] },
      email: {
         type: String,
         index: { unique: true },
         required: [true, "User should have an email"],
      },
      hashedPassword: {
         type: String,
         required: [true, "User should have a password"],
      },
      department: {
         type: String,
         required: [true, "User should have a department"],
      },
      bio: {
         type: String,
         default: "",
      },
      role: { type: String, enum: ["admin","user","official"], default: "official" },
      profilePic: { type: String, default: null },
   },
   { timestamps: true },
);

const Users = model("Users", userSchema);

export default Users;
