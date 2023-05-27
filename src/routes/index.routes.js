import { Router } from "express";
import studantRouter from "./students.routes.js";
import projectRouter from "./projects.routes.js";

const router = Router();
router.use(studantRouter);
router.use(projectRouter);

export default router;

