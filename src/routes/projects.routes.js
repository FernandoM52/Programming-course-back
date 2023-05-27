import { Router } from "express";
import { deliverProject, getDeliveries } from "../controllers/projects.controller.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { projectSchema } from "../schemas/project.schema.js";

const projectRouter = Router();

projectRouter.post("/deliver", validateSchema(projectSchema), deliverProject);
projectRouter.get("/deliveries/:classCode/:project", getDeliveries);

export default projectRouter;
