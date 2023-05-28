import { db } from "../database/db.connection.js";

export async function getClassesDB() {
  const result = await db.query("SELECT * FROM classes;");
  return result;
}
