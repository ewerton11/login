import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { Register } from './router/register'
import { Login } from './router/login'
import { ValidateToken } from './router/validateToken'

const app = express()

app.use(bodyParser.json())

app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

app.get('/', function (req, res) {
  res.send('hello world')
})

app.post('/login', Login)
app.post('/register', Register)
app.post('/Validatetoken', ValidateToken)

const start = async () => {
  try {
    app.listen(3333, () => {
      console.log('Express está escutando na porta 3333')
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
start()
