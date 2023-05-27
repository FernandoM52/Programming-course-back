import { getProjectsDB } from "../repositories/project.repository.js";
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

export async function getClassesAndProjects(req, res) {
  try {
    const classes = await getClassesDB();
    const projects = await getProjectsDB();

    const response = {
      classesList: classes.rows,
      projectsList: projects.rows
    }
    res.send(response);
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
