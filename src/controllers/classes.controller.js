import { getClassesDB } from "../repositories/class.repository.js";
import { getProjectsDB } from "../repositories/project.repository.js";

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
