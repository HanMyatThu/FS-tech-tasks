import http from 'http'
import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import { connectDb } from './db/db'

const PORT = process.env.PORT || 8080
const app: express.Application = express()

app.use(cors({
  credentials: true,
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//import router
import { router } from './routes'

app.get('/', (_, res) => {
  res.status(200).json({
      success: true,
      message:
        'Welcome to our Node API',
  });
});

app.use('/api', router)

const server: http.Server = http.createServer(app)
connectDb()

server.listen(PORT, () => {
  console.log('Server running on http://localhost:8080/')
})