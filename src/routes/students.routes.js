import { Router } from "express";
import { validateRegisterStudent, validStudentCpf, validateStudentsByclass, validateStudentId } from "../middlewares/students.middleware.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { studentSchema } from "../schemas/student.schema.js";
import { registerStudent, updateStudent, getStudentsByClass, getStudentById } from "../controllers/students.controller.js";

const studentRouter = Router();

studentRouter.post("/register", validateSchema(studentSchema), validateRegisterStudent, registerStudent);
studentRouter.put("/students/:id", validateSchema(studentSchema), validStudentCpf, updateStudent);
studentRouter.get("/studentsList/:classCode", validateStudentsByclass, getStudentsByClass);
studentRouter.get("/students/:id", validateStudentId, getStudentById);

export default studentRouter;
