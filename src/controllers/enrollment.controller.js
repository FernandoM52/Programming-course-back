import { endEnrollmentDB } from "../repositories/enrollment.repository.js";

export async function endEnrollment(req, res) {
  try {
    await endEnrollmentDB(req.params);
    res.send({ message: "Matrícula finalizada com sucesso" });
  } catch (err) {
    res.status(500).send(err.message);
  }
}
