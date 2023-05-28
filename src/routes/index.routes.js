import { Router } from "express";
import classRoute from "./classes.routes.js";
import studentRouter from "./students.routes.js";
import enrollmentRoute from "./enrollments.routes.js";
import projectRouter from "./projects.routes.js";

const router = Router();
router.use(classRoute);
router.use(studentRouter);
router.use(enrollmentRoute);
router.use(projectRouter);

export default router;

