import joi from "joi";

export const studantSchema = joi.object({
  name: joi.string().min(2).max(50).trim().required(),
  cpf: joi.string().pattern(/^[0-9]+$/, "numbers").length(11).required(),
  email: joi.string().email().required(),
  image: joi.string().uri().trim().required(),
  className: joi.string().trim().required(),
});
