import express from "express"
import cors from "cors"
import {connection_db} from './database.js'
import { login,signup } from "./auth.js"

const app = express()
const port = 3000
connection_db()

app.use(express.json())
app.use(cors())

app.post('/signup', async (req, res) => {
  signup(req.body,res)
})

app.post('/login', (req, res) => {
  login(req.body,res)
})

app.listen(port, (error) => {
  if(error){
    console.log(error)
  }
  else{
  console.log(`Example app listening on port ${port}`)
  }
})