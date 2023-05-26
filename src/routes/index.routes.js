import { Router } from "express";
import studantRouter from "./students.routes.js";

const router = Router();
router.use(studantRouter);

export default router;
