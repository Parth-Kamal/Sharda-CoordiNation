import { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Project should have a name"],
    },
    description: {
      type: String,
      required: [true, "Project should have a description"],
    },
    duration: {
      type: String,
      required: [true, "Project should have a duration"],
    },
    startLocation: {
      type: String,
      required: [true, "Project should have a start location"],
    },
    endLocation: {
      type: String,
      default: "None",
    },
  },
  { timestamps: true }
);

const Project = model("Project", projectSchema);

export default Project;
