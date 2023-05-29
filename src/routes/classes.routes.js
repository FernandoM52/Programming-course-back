import { Router } from "express";
import { createClass, getClasses } from "../controllers/classes.controller.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { classSchema } from "../schemas/class.schema.js";

const classRoute = Router();

classRoute.post("/classes/create", validateSchema(classSchema), createClass);
classRoute.get("/classes", getClasses);

export default classRoute;
