import { Router } from "express";
import studentRouter from "./students.routes.js";
import projectRouter from "./projects.routes.js";

const router = Router();
router.use(studentRouter);
router.use(projectRouter);

export default router;

