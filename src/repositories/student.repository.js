import { db } from "../database/db.connection.js";

export async function registerStudentDB(body) {
  const { name, email, image, cpf, className } = body;

  await db.query(
    `INSERT INTO students (name, cpf, email, image, "currentClass")
      VALUES ($1, $2, $3, $4, $5);`,
    [name, cpf, email, image, className,]
  );
}

export async function updateStudentDB(body, params) {
  const { name, cpf, email, image, } = body;
  const { id } = params;

  await db.query(
    `UPDATE students SET name = $1, cpf = $2, email = $3, image = $4
     WHERE id = $5;`,
    [name, cpf, email, image, id,]
  );
}

export async function getStudentDB(body) {
  const { email, cpf } = body;

  const result = await db.query("SELECT * FROM students WHERE email = $1 AND cpf = $2;", [email, cpf]);
  return result;
}

export async function getStudentByCpfDB(body) {
  const { cpf } = body;

  const result = await db.query("SELECT * FROM students WHERE cpf = $1;", [cpf]);
  return result;
}

export async function getStudentByIdDB(params) {
  const { id } = params;

  const result = await db.query(`SELECT * FROM students WHERE id = $1;`, [id]);
  return result;
}

export async function getStudentDataDB(id) {
  const result = await db.query(
    `SELECT students.*, enrollments.started, enrollments.ended
     FROM students
     JOIN enrollments ON enrollments."studantId" = students.id
     WHERE students.id = $1;`,
    [id]
  );
  return result;
}

export async function checkStudentsClassDB(params) {
  const { classCode } = params;

  const result = await db.query(
    `SELECT students.id, students.name, students.image FROM students WHERE "currentClass" = $1;`,
    [classCode]
  );
  return result;
}
