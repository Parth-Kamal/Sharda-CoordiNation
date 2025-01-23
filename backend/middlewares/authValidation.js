import yup from "yup";

import { createValidationMiddleware } from "./utils/createValidationMiddleware.js";

const registerSchema = yup
   .object({
      name: yup.string().min(3).max(100).required("Name is required"),
      email: yup.string().email("Invalid email format").max(100).required("Email is required"),
      password: yup.string().min(8).max(20).required("Password is required"),
      department: yup.string().required("Department is required"),
      role: yup.string().oneOf(["admin","user", "official"]).default("official"),
      profilePic: yup.string().nullable(),
   })
   .noUnknown();

export const registerValidation = createValidationMiddleware(registerSchema);

const loginSchema = yup
   .object({
      email: yup.string().email("Invalid email format").max(100).required("Email is required"),
      password: yup.string().min(8).max(20).required("Password is required"),
   })
   .noUnknown();

export const loginValidation = createValidationMiddleware(loginSchema);

const updateSchema = yup
   .object({
      name: yup.string().min(3).max(100).required("Name is required"),
      department: yup.string().required("Department is required"),
      bio: yup.string().nullable(),
   })
   .noUnknown();

export const updateValidation = createValidationMiddleware(updateSchema);
