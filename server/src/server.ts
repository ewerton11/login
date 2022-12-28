import express from "express"
import bodyParser from "body-parser"

import { Register } from "./router/register"
import { Login } from "./router/login"

const app = express()

app.use(bodyParser.json())

app.get("/", function (req, res) {
  res.send("hello world")
})

app.post("/login", Login)
app.post("/register", Register)

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
