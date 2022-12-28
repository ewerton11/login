import { Request, Response } from "express"
import { connectionDB } from "../../../database/db"

interface Body {
  name: string
  email: string
  password: string
}

interface Results {
  length: number
}

export function Register(req: Request, res: Response) {
  const { name, email, password } = req.body as Body

  connectionDB.query(
    `SELECT email FROM users WHERE email = '${email}'`,
    (error: Error, results: Results, fields) => {
      if (error) {
        throw error
      }

      if (!name) {
        res.status(400).send({ message: "invalid name" })
        return
      }

      if (!email) {
        res.status(400).send({ message: "invalid email" })
        return
      }

      if (!password) {
        res.status(400).send({ message: "invalid password" })
        return
      }

      if (results.length > 0) {
        res.status(400).send({ message: "Email already exists" })
      } else {
        connectionDB.query(
          "INSERT INTO users SET ?",
          { name, email, password },
          (insertError, insertResults) => {
            if (insertError) {
              throw insertError
            }
            res.send({ message: "Email added successfully" })
          }
        )
      }
    }
  )
}
