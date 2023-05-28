import { Router } from "express";
import { endEnrollment } from "../controllers/enrollment.controller.js";
import checkEnrrolment from "../middlewares/enrollments.middleware.js";

const enrollmentRoute = Router();

enrollmentRoute.patch("/students/enrollment/:id", checkEnrrolment, endEnrollment);

export default enrollmentRoute;
