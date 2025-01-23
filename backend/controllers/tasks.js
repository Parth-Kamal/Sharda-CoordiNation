import Tasks from "../models/tasks.js";

export const getAllTasks = async (req, res, next) => {
   try {
      const tasks = await Tasks.find({ department: req.user.department });
      if (!tasks) {
         return res.status(404).json({ message: "Tasks not found", success: false });
      }
      res.status(200).json({ message: "Tasks retrieved successfully", tasks, success: true });
   } catch (error) {
      next(error);
   }
};

export const getTask = async (req, res, next) => {
   try {
      const task = await Tasks.findById(req.params.id);
      if (!task || task.department !== req.user.department) {
         return res.status(404).json({ message: "Task not found", success: false });
      }
      res.status(200).json({ message: "Task retrieved successfully", task, success: true });
   } catch (error) {
      next(error);
   }
};

export const createTask = async (req, res, next) => {
   try {
      const { title, status } = req.body;
      const { department } = req.user;
      const task = await Tasks.create({ title, status, department });
      res.status(201).json({ message: "Task created successfully", task, success: true });
   } catch (error) {
      next(error);
   }
};

export const updateTask = async (req, res, next) => {
   try {
      const { title, status } = req.body;
      const task = await Tasks.findById(req.params.id);
      if (!task || task.department !== req.user.department) {
         return res.status(404).json({ message: "Task not found", success: false });
      }
      await task.updateOne({ title, status });
      res.status(200).json({ message: "Task updated successfully", task, success: true });
   } catch (error) {
      next(error);
   }
};

export const deleteTask = async (req, res, next) => {
   try {
      const task = await Tasks.findByIdAndDelete(req.params.id);
      if (!task || task.department !== req.user.department) {
         return res.status(404).json({ message: "Task not found", success: false });
      }
      res.status(200).json({ message: "Task deleted successfully", task, success: true });
   } catch (error) {
      next(error);
   }
};
