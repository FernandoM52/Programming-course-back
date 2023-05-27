import { createEnrollmentDB, getClassesDB, getStudantByIdDB, registerStudantDB } from "../repositories/studant.repository.js";

export async function registerStudant(req, res) {
  try {
    await registerStudantDB(req.body);
    await createEnrollmentDB(req.body)
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getClasses(req, res) {
  try {
    const classes = await getClassesDB();
    res.send(classes.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getStudantsByClass(req, res) {
  try {
    const { studants } = res.locals;
    res.send(studants);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getStudantById(req, res) {
  const classCode = req.params.classCode;
  const studantId = req.params.studantId;

  try {
    const studant = await getStudantByIdDB(classCode, studantId);
    res.send(studant.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
