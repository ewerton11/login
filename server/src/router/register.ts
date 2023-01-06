import { Request, Response } from 'express'
import { connectionDB } from '../../database/db'

interface Body {
  name: string
  email: string
  password: string
}

export function Register(req: Request, res: Response) {
  const { name, email, password } = req.body as Body

  const query = 'SELECT email FROM users WHERE email = ?'
  const queryInsert = 'INSERT INTO users SET ?'

  connectionDB.query(query, email, (error, results: Array<any>) => {
    if (error) {
      throw error
    }

    if (!name || !email || !password) {
      return res
        .status(400)
        .send({ message: 'invalid name, email or password' })
    }

    if (results.length > 0) {
      return res.status(400).send({ message: 'Email already exists' })
    } else {
      connectionDB.query(
        queryInsert,
        { name, email, password },
        (insertError) => {
          if (insertError) {
            throw insertError
          }
          return res.send({ message: 'Email added successfully' })
        }
      )
    }
  })
}
