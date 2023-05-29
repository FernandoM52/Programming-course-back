import { db } from "../database/db.connection.js";

export async function createProjectDB(body) {
  const { projectName } = body;
  await db.query("INSER INTO projects (name) VALUES ($1);", [projectName]);
}

export async function deliverProjectDB(body) {
  const { className, studentName, email, projectName, projectLink } = body;

  const student = await db.query("SELECT * FROM students WHERE email = $1 AND name = $2;", [email, studentName]);
  const { id } = student.rows[0];

  await db.query(
    `INSERT INTO deliveries ("classCode", "studentId", "projectName", "projectLink")
     VALUES ($1, $2, $3, $4);`,
    [className, id, projectName, projectLink,]
  );
}

export async function updateNoteDB(params, body) {
  const { project, id } = params;
  const { note } = body;

  await db.query(
    `UPDATE deliveries SET "currentNote" = $1
     WHERE "projectName" = $2 AND "studentId" = $3;`,
    [note, project, id,]
  );
}

export async function getProjectsDB() {
  const result = await db.query("SELECT * FROM projects;");
  return result;
}

export async function getDeliveriesDB(params) {
  const { classCode, project } = params;

  const result = await db.query(
    `SELECT projects.name AS "ProjectName", students.id as "studentId", students.name AS "studentName", students.image, deliveries."currentNote"
     FROM deliveries
     JOIN projects ON projects.name = $1
     JOIN students ON students.id = deliveries."studentId"
     WHERE deliveries."dateDeliver" IS NOT NULL
      AND deliveries."projectName" = $2
      AND students."currentClass" = $3;`,
    [project, project, classCode,]
  );
  return result.rows;
}

export async function checkDelivery(body) {
  const { email, projectName } = body;

  const student = await db.query("SELECT * FROM students WHERE email = $1;", [email]);
  const { id } = student.rows[0];

  const project = await db.query(
    `SELECT * FROM deliveries
     WHERE "studentId" = $1 AND "projectName" = $2`,
    [id, projectName]
  );
  return project;
}
