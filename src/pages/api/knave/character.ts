import type { NextApiRequest, NextApiResponse } from 'next'
import { KnaveCharacter } from '@/knave'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const character = new KnaveCharacter()
    character.generate()
    res.status(200).json(character)
  } else {
    res.status(400)
  }
}

export default handler
