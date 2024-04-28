import http from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'

import { connectDb } from './db/db'

import dotenv from 'dotenv'
dotenv.config()

const app: express.Application = express()

app.use(cors({
  credentials: true,
}))

app.use(bodyParser.json())

const server: http.Server = http.createServer(app)
connectDb()

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080/')
})