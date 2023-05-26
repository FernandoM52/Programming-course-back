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
