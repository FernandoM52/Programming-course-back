import { db } from "../database/db.connection.js";

export async function getProjectsDB() {
  const result = await db.query("SELECT * FROM projects;");
  return result;
}

export async function deliverProjectDB(body) {
  const { className, studantName, email, projectName, projectLink } = body;

  const studant = await db.query("SELECT * FROM studants WHERE email = $1 AND name = $2;", [email, studantName]);
  const { id } = studant.rows[0];

  await db.query(
    `INSERT INTO deliveries ("classCode", "studantId", "projectName", "projectLink")
     VALUES ($1, $2, $3, $4);`,
    [className, id, projectName, projectLink,]
  );
}

export async function getDeliveriesDB(params) {
  const { classCode, project } = params;

  const result = await db.query(
    `SELECT projects.name AS "ProjectName", studants.id as "studantId", studants.name AS "StudantName", studants.image, deliveries."currentNote"
     FROM deliveries
     JOIN projects ON projects.name = $1
     JOIN studants ON studants.id = deliveries."studantId"
     WHERE deliveries."dateDeliver" IS NOT NULL
      AND deliveries."projectName" = $2
      AND studants."currentClass" = $3;`,
    [project, project, classCode,]
  );
  return result.rows;
}

export async function updateNoteDB(params, body) {
  const { project, id } = params;
  const { note } = body;

  await db.query(
    `UPDATE deliveries SET "currentNote" = $1
     WHERE "projectName" = $2 AND "studantId" = $3;`,
    [note, project, id,]
  );
}
