import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { studantSchema } from "../schemas/studant.schema.js";
import { validateRegisterStudant } from "../middlewares/studants.middleware.js";
import { getStudants, registerStudant } from "../controllers/studants.controller.js";

const studantRouter = Router();

studantRouter.post("/register", validateSchema(studantSchema), validateRegisterStudant, registerStudant);
studantRouter.get("/studants", getStudants);

export default studantRouter;
