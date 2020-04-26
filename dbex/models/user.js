const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jw = require("jsonwebtoken")
const { key } = require("../libs/env")

const userSchema = new mongoose.Schema({
  email: String,
  hashedPassword: {
    type: String
  },
  token: String,
  courses: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Course"
    }
  ]
})

userSchema.virtual("password")

userSchema.pre("validate", async function () {
  if (this.password === undefined) return
  try {
    this.hashedPassword = await bcrypt.hash(this.password, 10)
  } catch (error) {
    console.log(error)
  }
})

userSchema.statics.authenticate = async function ({ email, password }) {
  const user = await this.findOne({ email })
  const valid = await bcrypt.compare(password, user.hashedPassword)
  if (!valid) throw new Error("Email or Password are wrong")

  user.token = jw.sign({ id: user.id }, key)

  return user
}

module.exports = mongoose.model("User", userSchema)
