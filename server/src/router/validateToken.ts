import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface Body {
  storageToken: string
}

interface JwtPayload {
  id: number
  email: string
  exp: number
}

export async function ValidateToken(req: Request, res: Response) {
  try {
    const { storageToken } = req.body as Body
    // process.env.JWT_SECRET,
    const decoded = jwt.verify(storageToken, 'secret') as JwtPayload

    // Verifique a data de expiração do token
    if (decoded.exp < Date.now() / 1000) {
      return res.status(400).send(null)
    } else {
      return res.status(200).send({ decoded })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send({
      message: 'Internal Server Error',
    })
  }
}
