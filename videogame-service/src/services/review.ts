import db from '../config/db'

const getReviewsByGameId = async (gameId: number) => {
  const result = await db.query(
    'SELECT id, user_id, username, game_id, name, rating, review FROM game_reviews WHERE game_id = $1',
    [gameId]
  )

  return result.rows
}

const addReview = async (
  userUuid: string,
  username: string,
  gameId: number,
  name: string,
  rating: number,
  review: string
) => {
  const existingReview = await db.query(
    'SELECT id FROM game_reviews WHERE game_id = $1 AND user_id = $2',
    [gameId, userUuid]
  )

  if (existingReview.rows.length > 0) {
    return { alreadyReviewed: true, id: existingReview.rows[0].id }
  }

  const result = await db.query(
    'INSERT INTO game_reviews (user_id, username, game_id, name, rating, review) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, user_id, username, game_id, name, rating, review',
    [userUuid, username, gameId, name, rating, review]
  )

  console.log('result of add review', result.rows)

  return result.rows[0]
}

export default { addReview, getReviewsByGameId }
