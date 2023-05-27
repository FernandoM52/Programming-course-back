import { createEnrollmentDB, getClassesDB, getStudantsDB, registerStudantDB } from "../repositories/studant.repository.js";

export async function registerStudant(req, res) {
  try {
    await registerStudantDB(req.body);
    await createEnrollmentDB(req.body)
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getStudants(req, res) {
  try {
    const studant = await getStudantsDB();
    const classes = await getClassesDB();
    const response = {
      studantsList: studant.rows,
      classesList: classes.rows,
    }
    res.send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
