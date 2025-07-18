import { Pool } from 'pg'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config()

const pool = new Pool({
  host: process.env.USER_DB_CONTAINER_NAME || 'user_pgdb',
  database: process.env.DB_NAME || 'gameradar_users',
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USERNAME,
  port: 5432,
})

export const initDBTables = async () => {
  try {
    const sqlPath = path.join(__dirname, 'sql', 'init.sql')
    const sql = fs.readFileSync(sqlPath, 'utf8')

    await pool.query(sql)
    console.log('✅ Tables and default data initialized successfully')
  } catch (error) {
    console.error('❌ Failed to initialize tables:', error)
    throw error
  }
}

export default pool
