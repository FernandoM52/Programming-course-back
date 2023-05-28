import { Router } from "express";
import { getClassesAndProjects } from "../controllers/classes.controller.js";

const classRoute = Router();

classRoute.get("/classes", getClassesAndProjects);

export default classRoute;
