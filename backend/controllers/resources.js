import Resources from "../models/resources.js";

export const getAllResources = async (req, res, next) => {
   try {
      const resources = await Resources.find();
      if (!resources) {
         return res.status(404).json({ message: "Resources not found", success: false });
      }
      res.status(200).json({
         message: "Resources retrieved successfully",
         resources,
         success: true,
      });
   } catch (error) {
      next(error);
   }
};

export const getResource = async (req, res, next) => {
   try {
      const resource = await Resources.findById(req.params.id);
      if (!resource) {
         return res.status(404).json({ message: "Resource not found", success: false });
      }
      res.status(200).json({ message: "Resource retrieved successfully", resource, success: true });
   } catch (error) {
      next(error);
   }
};

export const createResource = async (req, res, next) => {
   try {
      const { title, description, department, status } = req.body;
      const resource = await Resources.create({
         title,
         description,
         department,
         status,
      });
      res.status(201).json({ message: "Resource created successfully", resource, success: true });
   } catch (error) {
      next(error);
   }
};

export const updateResource = async (req, res, next) => {
   try {
      const { title, description, department, status } = req.body;
      const resource = await Resources.findById(req.params.id);
      if (!resource) {
         return res.status(404).json({ message: "Resource not found", success: false });
      }
      await resource.updateOne({ title, description, department, status });
      res.status(200).json({ message: "Resource updated successfully", resource, success: true });
   } catch (error) {
      next(error);
   }
};

export const deleteResource = async (req, res, next) => {
   try {
      const resource = await Resources.findByIdAndDelete(req.params.id);
      if (!resource) {
         return res.status(404).json({ message: "Resource not found", success: false });
      }
      res.status(200).json({ message: "Resource deleted successfully", resource, success: true });
   } catch (error) {
      next(error);
   }
};
