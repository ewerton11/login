import { Request, Response } from "express"
import jwt from "jsonwebtoken"

import { connectionDB } from "../../../database/db"

interface Body {
  email: string
  password: string
  token: string
}

interface Results {
  length: number
}

export function Login(req: Request, res: Response) {
  const { email, password } = req.body as Body

  connectionDB.query(
    `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`,
    (error, results: Results, fields) => {
      if (error) {
        throw error
      }

      if (!email) {
        res.status(400).send({ message: "invalid email" })
        return
      }

      if (!password) {
        res.status(400).send({ message: "invalid password" })
        return
      }

      const token = jwt.sign(
        { id: results[0].id, email: results[0].email },
        "secret",
        { expiresIn: "1d" }
      )

      if (results.length > 0) {
        res.status(200).send({ email, token })
      } else {
        console.log("email inexistente")
      }
    }
  )

  connectionDB.end()
}
