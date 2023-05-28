import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { studantSchema } from "../schemas/studant.schema.js";
import { validStudentCpf, validateRegisterStudant, validateStudantsByclass } from "../middlewares/studants.middleware.js";
import { endEnrollment, getClassesAndProjects, getStudantById, getStudantsByClass, registerStudant, updateStudent } from "../controllers/studants.controller.js";

const studentRouter = Router();

studentRouter.post("/register", validateSchema(studantSchema), validateRegisterStudant, registerStudant);
studentRouter.get("/classes", getClassesAndProjects);
studentRouter.get("/students/:classCode", validateStudantsByclass, getStudantsByClass);
studentRouter.get("/students/:classCode/:id", getStudantById);
studentRouter.put("/students/:id", validateSchema(studantSchema), validStudentCpf, updateStudent);
studentRouter.put("/students/enrollment/:id", endEnrollment);

export default studentRouter;
