const jw = require("jsonwebtoken")
const { key } = require("../libs/env")
const User = require("../models/user")

module.exports = async function ({ req }) {
  let token = null
  let currentUser = null

  token = req.headers["authorization"]

  if (!token) return {}
  const decodedInfo = jw.verify(token, key)

  if (token && decodedInfo) {
    currentUser = await User.findById(decodedInfo.id)
    if (!currentUser) throw new Error("Invalid token.")
  }

  return { token, currentUser }
}
