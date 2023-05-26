import { getStudantDB } from "../repositories/studant.repository.js";

export async function validateRegisterStudant(req, res, next) {
  try {
    // vefificar se aluno ja possui cadastro/matricula
    // fazer query para verificar se o valor "currentClass" na coluna "studant" é diferente de null
    // se for diferente, deve retornar que o aluno ja está em uma turma, pois ele so pode participar de uma turma por vez
    // quando ele estiver dentro de uma turma, ou seja, "currentClass" é diferente de null
    // ele não pode entrar em outra turma, somente se o valor "ended" na matricula do aluno for diferente de null
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
