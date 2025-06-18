import { Request, Response } from 'express'
import userService from '../services/user'

const getUsers = (req: Request, res: Response) => {
  try {
    const users = userService.getUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

// function read(req: Request, res: Response) {
//   const artistId = req.params.id
//   const artist = artistService.find(artistId)
//   if (artist) res.status(200).json(artist)
//   else res.status(404).json({ message: 'Artiste non trouvé' })
// }

// function create(req: Request, res: Response) {
//   const datas = req.body
//   const createdArtist = artistService.create(datas)
//   if (createdArtist) res.status(201).json({ message: 'Artiste créé' })
//   else res.status(400).json({ message: "Erreur lors de l'insertion" })
// }

// function update(req: Request, res: Response) {
//   const artistId = req.params.id
//   const datas = req.body
//   const updatedArtist = artistService.update(artistId, datas)
//   if (updatedArtist) {
//     res.status(200).json({ message: 'Artiste édité' })
//   } else {
//     res.status(400).json({ message: "Erreur lors de l'édition" })
//   }
// }

// function remove(req: Request, res: Response) {
//   const artistId = req.params.id
//   const removedArtist = artistService.remove(artistId)
//   if (removedArtist) {
//     res.status(200).json({ message: 'Artiste supprimé' })
//   } else {
//     res.status(400).json({ message: 'Erreur lors de la suppression' })
//   }
// }

export default { getUsers }
