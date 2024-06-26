import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String
      },
    }
  ],
})

export const User = mongoose.model('users', UserSchema)