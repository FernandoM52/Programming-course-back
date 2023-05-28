import { createEnrollmentDB, updateStudentEnrollmentDB } from "../repositories/enrollment.repository.js";
import { getStudentDataDB, registerStudentDB, updateStudentDB } from "../repositories/student.repository.js";

export async function registerStudent(req, res) {
  try {
    if (req.body.id) {
      await updateStudentEnrollmentDB(req.body);
    } else {
      await registerStudentDB(req.body);
    }

    await createEnrollmentDB(req.body)
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function updateStudent(req, res) {
  try {
    await updateStudentDB(req.body, req.params);
    res.send({ message: "Dados atualizados com sucesso!" });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getStudentsByClass(req, res) {
  try {
    const { students } = res.locals;
    res.send(students);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getStudentById(req, res) {
  const { id } = res.locals.student;

  try {
    const studentData = await getStudentDataDB(id);
    res.send(studentData.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
