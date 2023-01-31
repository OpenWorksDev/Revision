import db from "../../lib/db";

export async function createUser(email: string, password: string) {
  let conn;
  try {
      conn = await db.getConnection();
      const result = await conn.query(
          'INSERT INTO users (email, password) VALUES (?, ?)',
          [email, password]
      );
      console.log(`New user created with ID: ${result.insertId}`);
  } catch (err) {
      throw err;
  } finally {
    if (conn) conn.end();
  }
}

export async function getUserByEmail(email: string) {
  let conn;
  try {
	  conn = await db.getConnection();
    const results = await conn.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    conn.release();
    return results[0];
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    if (conn) conn.end();
  }
}
