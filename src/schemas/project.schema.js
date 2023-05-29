import joi from "joi";

export const projectSchema = joi.object({
  className: joi.string().trim().required(),
  studentName: joi.string().min(2).max(50).trim().required(),
  email: joi.string().email().required(),
  projectName: joi.string().trim().required(),
  projectLink: joi.string().uri().trim().required(),
});

export const projectNoteSchema = joi.object({
  note: joi.string().valid("Acima das expectativas", "Dentro das expectativas", "Abaixo das expectativas").trim().required(),
});

export const createProjectSchema = joi.object({
  projectName: joi.string().trim().required(),
});
