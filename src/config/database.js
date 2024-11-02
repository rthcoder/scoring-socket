import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
});

async function db(query, params = []) {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('Database connected successfully...');

    const sanitizedParams = params.map(param => param === undefined ? null : param);

    const [rows] = await connection.execute(query, sanitizedParams);
    return rows;
  } catch (error) {
    console.error('Error executing query:', error.message);
    throw new Error(`Database error: ${error.message}`);
  } finally {
    if (connection) connection.release();
  }
}

export { db };
