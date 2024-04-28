import mongoose from 'mongoose'
import 'dotenv/config'

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("DB is connected")
  } catch (e) {
    console.log("DB error",e)
  }
}