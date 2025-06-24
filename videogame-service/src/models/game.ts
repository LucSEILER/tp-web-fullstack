interface GameSimple {
  id: string
  cover: GameCover
  genres: GameGenre[]
  name: string
  summary: string
}

interface GameGenre {
  id: string
  name: string
}

// interface GameFull extends GameSimple {
//   first_release_date: number
//   rating: number
// }

interface GameCover {
  id: string
  url: string
}

export default GameSimple
