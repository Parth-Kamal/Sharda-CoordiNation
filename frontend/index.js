import mongoose from "mongoose";
import Project from "./index.js"; // Assuming your schema is in `project.js`

// MongoDB connection URL
const mongoURI = "mongodb://localhost:27017/icp";

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Function to create and save a project
const createProject = async () => {
  try {
    const newProject = new Project({
      name: "Road Development",
      description: "A project to develop roads in sector 1.",
      duration: "6 months",
      startLocation: "Sector 1",
      endLocation: "Sector 2",
    });

    const savedProject = await newProject.save();
    console.log("Project saved successfully:", savedProject);
  } catch (err) {
    console.error("Error saving project:", err.message);
  } finally {
    mongoose.connection.close(); // Close the connection after operation
  }
};

// Call the function to save the project
createProject();
