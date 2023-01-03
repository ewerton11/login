import { Request, Response } from "express"
import jwt from "jsonwebtoken"

import { connectionDB } from "../../database/db"

interface Body {
  email: string
  password: string
  token: string
}

export async function Login(req: Request, res: Response) {
  try {
    const { email, password } = req.body as Body

    if (!email || !password) {
      return res.status(400).send({ message: "Invalid email or password" })
    }

    const query = "SELECT * FROM users WHERE email = ? AND password = ?"

    connectionDB.query(query, [email, password], (error, results) => {
      if (error) {
        throw error
      }

      if (results.length > 0) {
        const token = jwt.sign(
          { id: results[0].id, email: results[0].email },
          // process.env.JWT_SECRET,
          "secret",
          { expiresIn: "1d" }
        )

        return res.status(200).send({ email, token })
      } else {
        return res
          .status(401)
          .send({ message: "Email or password is incorrect" })
      }
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: "Internal Server Error" })
  }
}
