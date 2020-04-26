const User = require("../models/user")
const Course = require("../models/course")

module.exports = {
  Query: {
    async getUsers() {
      return await User.find().populate("courses")
    },
    async getUser(obj, { id }) {
      return await User.findById(id)
    }
  },
  Mutation: {
    async signUp(obj, { input }) {
      return await new User(input).save()
    },
    logIn(obj, { input }) {},
    signOut(obj, { input }) {}
  }
}
