import { Router } from "express";
import { deliverProject, getDeliveries, updateNote } from "../controllers/projects.controller.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { projectNoteSchema, projectSchema } from "../schemas/project.schema.js";

const projectRouter = Router();

projectRouter.post("/deliver", validateSchema(projectSchema), deliverProject);
projectRouter.get("/deliveries/:classCode/:project", getDeliveries);
projectRouter.put("/updateNote/:project/:id", validateSchema(projectNoteSchema), updateNote);

export default projectRouter;
