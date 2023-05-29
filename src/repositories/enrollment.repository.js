import { db } from "../database/db.connection.js";

export async function createEnrollmentDB(body) {
  const { email, cpf } = body;

  const result = await db.query("SELECT * FROM students WHERE email = $1 AND cpf = $2;", [email, cpf]);
  const { id, currentClass } = result.rows[0];

  await db.query(
    `INSERT INTO enrollments ("studantId", "classCode")
    VALUES ($1, $2);`,
    [id, currentClass,]
  );
}

export async function updateStudentEnrollmentDB(body) {
  const { id, name, email, image, className } = body;

  await db.query(
    `UPDATE students
     SET name = $1, email = $2, image = $3, "currentClass" = $4
     WHERE id = $5;`,
    [name, email, image, className, id,]
  );
}

export async function endEnrollmentDB(params) {
  const { id } = params;

  await db.query(
    `UPDATE enrollments SET ended = now()
     WHERE enrollments."studantId" = $1;`,
    [id]
  );

  await db.query(
    `UPDATE students SET "currentClass" = null
     WHERE id = $1;`,
    [id]
  );
}

export async function checkEnrrolmentDB(params) {
  const { id } = params;

  const result = await db.query(`SELECT * FROM enrollments WHERE "studantId" = $1 AND ended != null;`, [id]);
  return result;
}
