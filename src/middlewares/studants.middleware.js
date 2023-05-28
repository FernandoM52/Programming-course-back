import { getStudantDB, checkStudantsClassDB, getStudantByCpfDB } from "../repositories/studant.repository.js";

export async function validateRegisterStudant(req, res, next) {
  try {
    const studant = await getStudantDB(req.body);

    if (studant.rows[0]) {
      const { currentClass } = studant.rows[0];
      if (currentClass !== null) return res.status(409).send({ message: `Aluno já está cadastrado na turma ${currentClass}` });
    }

    if (!studant.rows[0]) return next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function validateStudantsByclass(req, res, next) {
  try {
    const studants = await checkStudantsClassDB(req.params);
    if (studants.rowCount === 0) return res.status(404).send({ message: "Não há estudantes nesta turma" });

    res.locals.studants = studants.rows;
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function validStudentCpf(req, res, next) {
  const { id } = req.params;

  try {
    const student = await getStudantByCpfDB(req.body);
    if (student.rowCount === 0) return next();
    if (student.rowCount > 0 && student.rows[0].id === Number(id)) return next();

    return res.status(409).send({ message: "Estudante já existe" });
  } catch (err) {
    res.status(500).send(err.message);
  }
}
