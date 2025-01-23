import yup from "yup";

import { createValidationMiddleware } from "./utils/createValidationMiddleware.js";

const resourceSchema = yup
   .object({
      title: yup.string().min(3).max(100).required("Title is required"),
      description: yup.string().min(10).max(500).required("Description is required"),
      department: yup.string().min(3).max(100).required("Department is required"),
      status: yup.string().oneOf(["available", "inuse"]).required("Status is required"),
   })
   .noUnknown();

export const resourceValidation = createValidationMiddleware(resourceSchema);
