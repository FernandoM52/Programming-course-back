import { deliverProjectDB, updateNoteDB, getDeliveriesDB, getProjectsDB, createProjectDB } from "../repositories/project.repository.js";

export async function creatProject(req, res) {
  try {
    await createProjectDB(req.body);
    res.status(201).send("Projeto criado com sucesso");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deliverProject(req, res) {
  try {
    await deliverProjectDB(req.body);
    res.status(201).send({ message: "Projeto entregue com sucesso" });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function updateNote(req, res) {
  try {
    await updateNoteDB(req.params, req.body);
    res.send({ message: "Nota atualizada com sucesso!" });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getProjects(req, res) {
  try {
    const projects = await getProjectsDB();
    res.send(projects.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getDeliveries(req, res) {
  try {
    const projects = await getDeliveriesDB(req.params);
    res.send(projects);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
