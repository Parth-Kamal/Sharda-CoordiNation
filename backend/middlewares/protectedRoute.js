import jwt from "jsonwebtoken";

import Users from "../models/users.js";

export const protectedRoute = async (req, res, next) => {
   try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
         return res.status(401).json({ message: "Not authorized, no token", success: false });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || "verify");

      const user = await Users.findById(decoded._id).select("-hashedPassword");

      if (!user) {
         return res.status(404).json({ message: "User not found", success: false });
      }

      req.user = user;
      next();
   } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed", success: false });
   }
};

export const adminRoute = async (req, res, next) => {
   if (req.user.role !== "admin")
      return res.status(401).json({ message: "Not authorized, admin only", success: false });
   next();
};
