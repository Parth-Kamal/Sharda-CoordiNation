import yup from "yup";

import { createValidationMiddleware } from "./utils/createValidationMiddleware.js";

const taskSchema = yup
   .object({
      title: yup.string().min(3).max(100).required("Title is required"),
      status: yup.string().oneOf(["pending", "ongoing"]).required("Status is required"),
      department: yup.string().min(3).max(100).required("Department is required"),
   })
   .noUnknown();

export const taskValidation = createValidationMiddleware(taskSchema);
