const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

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
  console.log(user)
  const valid = await bcrypt.compare(password, user.hashedPassword)
  if (!valid) throw new Error("Email or Password are wrong")
  return user
}

module.exports = mongoose.model("User", userSchema)
