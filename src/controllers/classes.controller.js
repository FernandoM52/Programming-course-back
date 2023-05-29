import { createClassDB, getClassesDB } from "../repositories/class.repository.js";

export async function createClass(req, res) {
  try {
    await createClassDB(req.body);
    res.status(201).send("Turma criada com sucesso");
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
