import { db } from "../database/db.connection.js";

export async function getClassesDB() {
  const result = await db.query("SELECT * FROM classes;");
  return result;
}

export async function createClassDB(body) {
  const { code } = body;
  await db.query("INSER INTO classes (code) VALUES ($1);", [code]);
}
