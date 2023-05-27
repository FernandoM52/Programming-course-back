import { deliverProjectDB, getDeliveriesDB } from "../repositories/project.repository.js";

export async function deliverProject(req, res) {
  try {
    await deliverProjectDB(req.body);
    res.status(201).send({ message: "Projeto entregue com sucesso" });
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
