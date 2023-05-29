import joi from "joi";

export const classSchema = joi.object({
  className: joi.string().trim().required(),
});
