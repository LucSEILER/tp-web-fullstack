import { Pool } from 'pg'

const pool = new Pool({
  host: 'user_pgdb',
  database: 'gameradar_users',
  password: 'Passw0rd',
  user: 'Us3rn4me',
  port: 5432,
})

export default pool
