import { Router } from "express";

import { createTask, deleteTask, getAllTasks, getTask, updateTask } from "../controllers/tasks.js";
import { adminRoute } from "../middlewares/protectedRoute.js";
import { taskValidation } from "../middlewares/taskValidation.js";

const router = Router();

router.route("/").get(getAllTasks).post(adminRoute, taskValidation, createTask);

router
   .route("/:id")
   .get(getTask)
   .put(adminRoute, taskValidation, updateTask)
   .delete(adminRoute, deleteTask);

export default router;
