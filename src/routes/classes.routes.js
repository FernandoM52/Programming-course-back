import { Router } from "express";
import { getClasses } from "../controllers/classes.controller.js";

const classRoute = Router();

classRoute.get("/classes", getClasses);

export default classRoute;
