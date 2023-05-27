import { db } from "../database/db.connection.js";

export async function getStudantDB(body) {
  const { email, cpf } = body;

  const result = await db.query("SELECT * FROM studants WHERE email = $1 AND cpf = $2;", [email, cpf]);
  return result;
}

export async function registerStudantDB(body) {
  const { name, email, image, cpf, className } = body;

  await db.query(
    `INSERT INTO studants (name, cpf, email, image, "currentClass")
      VALUES ($1, $2, $3, $4, $5);`,
    [name, cpf, email, image, className,]
  );
}

export async function createEnrollmentDB(body) {
  const { email, cpf } = body;

  const result = await db.query("SELECT * FROM studants WHERE email = $1 AND cpf = $2;", [email, cpf]);
  const { id, currentClass } = result.rows[0];

  await db.query(
    `INSERT INTO enrollments ("studantId", "classCode")
    VALUES ($1, $2);`,
    [id, currentClass,]
  );
}

export async function getStudantsDB() {
  const result = await db.query("SELECT studants.id, studants.name, studants.image FROM studants;");
  return result;
}

export async function getClassesDB() {
  const result = await db.query("SELECT * FROM classes;");
  return result;
}

export async function checkStudantsClassDB(params) {
  const { classCode } = params;

  const result = await db.query(
    `SELECT studants.id, studants.name, studants.image FROM studants WHERE "currentClass" = $1;`,
    [classCode]
  );
  return result;
}

export async function getStudantByIdDB(classCode, studantId) {
  const result = await db.query(
    `SELECT studants.*, enrollments.started, enrollments.ended
     FROM studants
     JOIN enrollments ON enrollments."classCode" = $1
     WHERE studants.id = $2;`,
    [classCode, studantId,]
  );
  return result;
}
