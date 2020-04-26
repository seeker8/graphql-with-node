const User = require("../models/user")
const Course = require("../models/course")

module.exports = {
  Query: {
    async getUsers() {
      return await User.find()
    },
    async getUser(obj, { id }) {
      return await User.findById(id)
    }
  },
  Mutation: {
    async signUp(obj, { input }) {
      return await new User(input).save()
    },
    async logIn(obj, { input }) {
      try {
        return await User.authenticate(input)
      } catch (error) {
        console.log(error)
        return null
      }
    },
    signOut(obj, { input }) {}
  },
  User: {
    async courses(user) {
      return await Course.find({ user: user.id })
    }
  }
}
