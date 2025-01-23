import { Router } from "express";

import { login, register, updateUser, uploadProfilePic } from "../controllers/auth.js";
import {
   loginValidation,
   registerValidation,
   updateValidation,
} from "../middlewares/authValidation.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = Router();

router.route("/register").post(registerValidation, register);
router.route("/login").post(loginValidation, login);
router.route("/update").put(protectedRoute, uploadProfilePic, updateValidation, updateUser);

export default router;
