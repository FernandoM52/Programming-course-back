import { Router } from "express";
import { deliverProject, updateNote, getDeliveries, getProjects, creatProject } from "../controllers/projects.controller.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { createProjectSchema, projectNoteSchema, projectSchema } from "../schemas/project.schema.js";
import deliveryValidation from "../middlewares/projects.middlewate.js";

const projectRouter = Router();

projectRouter.post("/projects/create", validateSchema(createProjectSchema), creatProject);
projectRouter.post("/projects/deliver", validateSchema(projectSchema), deliveryValidation, deliverProject);
projectRouter.put("/updateNote/:project/:id", validateSchema(projectNoteSchema), updateNote);
projectRouter.get("/projects", getProjects);
projectRouter.get("/projects/delivered/:classCode/:project", getDeliveries);

export default projectRouter;
