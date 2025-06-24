import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const pool = new Pool({
  host: process.env.USER_DB_CONTAINER_NAME || 'user_pgdb',
  database: process.env.DB_NAME || 'gameradar_users',
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USERNAME,
  port: 5432,
})

export default pool
