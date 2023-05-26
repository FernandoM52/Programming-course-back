import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { studantSchema } from "../schemas/studant.schema.js";
import { validateRegisterStudant } from "../middlewares/studants.middleware.js";
import { registerStudant } from "../controllers/studants.controller.js";

const studantRouter = Router();

studantRouter.post("/register", validateSchema(studantSchema), validateRegisterStudant, registerStudant);

export default studantRouter;
