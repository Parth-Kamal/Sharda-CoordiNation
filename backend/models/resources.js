import { Schema, model } from "mongoose";

const resourceSchema = new Schema(
   {
      title: {
         type: String,
         required: [true, "Resource should have a title"],
      },
      description: {
         type: String,
         required: [true, "Resource should have a description"],
      },
      department: {
         type: String,
         required: [true, "Resource should be from a department"],
      },
      status: {
         type: String,
         enum: ["available", "inuse"],
         required: [true, "Resource should have a budget allocated"],
      },
      
   },
   { timestamps: true },
);

const Resources = model("Resources", resourceSchema);

export default Resources;
