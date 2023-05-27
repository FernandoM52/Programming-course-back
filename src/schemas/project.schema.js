import joi from "joi";

export const projectSchema = joi.object({
  className: joi.string().trim().required(),
  studantName: joi.string().min(2).max(50).trim().required(),
  email: joi.string().email().required(),
  projectName: joi.string().trim().required(),
  projectLink: joi.string().uri().trim().required(),
});
