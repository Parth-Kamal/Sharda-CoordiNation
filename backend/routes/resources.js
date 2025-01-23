import { Router } from "express";

import {
   createResource,
   deleteResource,
   getAllResources,
   getResource,
   updateResource,
} from "../controllers/resources.js";
import { adminRoute } from "../middlewares/protectedRoute.js";
import { resourceValidation } from "../middlewares/resourceValidation.js";

const router = Router();

router.route("/").get(getAllResources).post(adminRoute, resourceValidation, createResource);

router
   .route("/:id")
   .get(getResource)
   .put(adminRoute, resourceValidation, updateResource)
   .delete(adminRoute, deleteResource);

export default router;
