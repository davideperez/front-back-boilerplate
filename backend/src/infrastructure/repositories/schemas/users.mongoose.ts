import mongoose from "mongoose"
import { User } from '../../../domain/entities/users.entity'

const Schema = mongoose.Schema

const userSchema = new Schema<User>({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
    unique: true
  }
},{
    timestamps: true
})

export const UserDB = mongoose.model("User", userSchema);