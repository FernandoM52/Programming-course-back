import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { studantSchema } from "../schemas/studant.schema.js";
import { validateRegisterStudant, validateStudantsByclass } from "../middlewares/studants.middleware.js";
import { getClassesAndProjects, getStudantById, getStudantsByClass, registerStudant } from "../controllers/studants.controller.js";

const studantRouter = Router();

studantRouter.post("/register", validateSchema(studantSchema), validateRegisterStudant, registerStudant);
studantRouter.get("/classes", getClassesAndProjects);
studantRouter.get("/studants/:classCode", validateStudantsByclass, getStudantsByClass);
studantRouter.get("/studants/:classCode/:studantId", getStudantById);

export default studantRouter;
