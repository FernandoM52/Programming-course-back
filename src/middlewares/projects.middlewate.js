import { checkDelivery } from "../repositories/project.repository.js";

export default async function deliveryValidation(req, res, next) {
  try {
    const projectDelivered = await checkDelivery(req.body);
    if (projectDelivered.rows[0]) return res.status(422).send({ message: "Projeto já foi entregue" });

    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}
