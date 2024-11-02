import mysql from 'mysql2/promise';

// Ulanish hovuzini sozlash
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000, // Ulanish uchun kutish vaqti (ms)
  acquireTimeout: 10000, // Hovuzdan ulanish olish uchun kutish vaqti (ms)
});

async function db(query, params = []) {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('Database connected successfully...');

    const [rows] = await connection.execute(query, params);
    return rows;
  } catch (error) {
    console.error('Error executing query:', error.message);
    throw new Error(`Database error: ${error.message}`);
  } finally {
    if (connection) connection.release();
  }
}

export { db };
