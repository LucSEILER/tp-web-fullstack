import db from '../config/db'
import { fetchSteamGameDetailsBatch } from './videogame'

const getUserPlaylist = async (userUuid: string) => {
  const result = await db.query(
    'SELECT id, game_id, name FROM videogame_userlist WHERE user_id = $1',
    [userUuid]
  )

  if (result.rows.length === 0) {
    return []
  }

  const gameIds = result.rows.map((r) => r.game_id)
  const games = await fetchSteamGameDetailsBatch(gameIds)

  return games
}

const addGameToList = async (gameId: number, userId: number, name: string) => {
  const existingInTheList = await db.query(
    'SELECT id FROM videogame_userlist WHERE game_id = $1 AND user_id = $2',
    [gameId, userId]
  )

  if (existingInTheList.rows.length > 0) {
    return { alreadyInTheList: true, id: existingInTheList.rows[0].id }
  }

  const result = await db.query(
    'INSERT INTO videogame_userlist (game_id, user_id, name) VALUES ($1, $2, $3) RETURNING id, game_id, user_id, name',
    [gameId, userId, name]
  )
  return result.rows[0]
}

const removeGameFromList = async (gameId: number, userId: number) => {
  const { rows: existingRows } = await db.query(
    'SELECT id FROM videogame_userlist WHERE game_id = $1 AND user_id = $2',
    [gameId, userId]
  )

  if (existingRows.length === 0) {
    return { error: 'not_found' }
  }

  const { rows: deletedRows } = await db.query(
    'DELETE FROM videogame_userlist WHERE game_id = $1 AND user_id = $2 RETURNING id',
    [gameId, userId]
  )

  if (deletedRows.length === 0) {
    return { error: 'delete_failed' }
  }

  return { success: true }
}
  
export default { getUserPlaylist, addGameToList, removeGameFromList }
