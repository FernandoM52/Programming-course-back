import { checkEnrrolmentDB } from "../repositories/enrollment.repository.js";

export default async function checkEnrrolment(req, res, next) {
  try {
    const student = await checkEnrrolmentDB(req.params);
    console.log(student.rows[0])
    if (student.rows[0]) return res.status(409).send({ message: "Estudante já está sem matrícula" });

    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}
