import { getClassesDB } from "../repositories/class.repository.js";

export async function getClasses(req, res) {
  try {
    const classes = await getClassesDB();
    res.send(classes.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
