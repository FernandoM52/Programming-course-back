import { createEnrollmentDB, registerStudantDB } from "../repositories/studant.repository.js";

export async function registerStudant(req, res) {
  try {
    await registerStudantDB(req.body);
    await createEnrollmentDB(req.body)
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
