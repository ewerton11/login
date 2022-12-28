import express from "express"

import { register } from "./router/register"
import bodyParser from "body-parser"

const app = express()

app.use(bodyParser.json())

// app.get("/", function (req, res) {
//   res.send("hello world")
// })

app.post("/register", register)

const start = async () => {
  try {
    app.listen({ port: 3000 })
    console.log("iniciou em http://localhost:3000")
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
start()
