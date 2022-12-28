import { Request, Response } from "express"
import { connectionDB } from "../../../database/db"

export function register(req: Request, res: Response) {
  const { name, email, password } = req.body

  connectionDB.query("SELECT * FROM users", (error, results, fields) => {
    if (error) {
      throw error
    }

    const list = results.map((item) => item.email)

    const emailExisting = list.some((item) => item === email)

    if (emailExisting) {
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
  })
}
