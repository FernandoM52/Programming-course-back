import { getStudentDB, checkStudentsClassDB, getStudentByCpfDB, getStudentByIdDB } from "../repositories/studant.repository.js";

export async function validateRegisterStudent(req, res, next) {
  try {
    const student = await getStudentDB(req.body);

    if (student.rows[0]) {
      const { currentClass } = student.rows[0];

      if (currentClass !== null) return res.status(409).send({ message: `Aluno já está cadastrado na turma ${currentClass}` });
      if (currentClass === null && student.rows[0].cpf === req.body.cpf) {
        req.body.id = student.rows[0].id;
        return next();
      }
    }

    if (!student.rows[0]) return next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function validateStudentsByclass(req, res, next) {
  try {
    const students = await checkStudentsClassDB(req.params);
    if (students.rowCount === 0) return res.status(404).send({ message: "Não há estudantes nesta turma" });

    res.locals.students = students.rows;
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function validStudentCpf(req, res, next) {
  const { id } = req.params;

  try {
    const student = await getStudentByCpfDB(req.body);
    if (student.rowCount === 0) return next();
    if (student.rowCount > 0 && student.rows[0].id === Number(id)) return next();

    return res.status(409).send({ message: "Estudante já existe" });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function validateStudentId(req, res, next) {
  try {
    const student = await getStudentByIdDB(req.params);
    if (!student.rows[0]) return res.status(404).send({ message: "Estudante não existe" });

    res.locals.student = student.rows[0];
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}

