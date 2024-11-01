import pg from 'pg'

const pool = new pg.Pool({
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  // connectionString: process.env.PG_CONNECTION_STRING
})

async function db(query, ...params) {
  const client = await pool.connect()
  console.log('Database connected succesfully...');


  try {
    const { rows } = await client.query(query, params.length ? params : null)
    return rows
  } catch (error) {
    console.log("DATABASE ERROR: ", error.message)
    throw new Error(error.message)
  } finally {
    client.release()
  }
}

export default db