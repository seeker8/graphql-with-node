const User = require("../models/user")

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
    logIn(obj, { input }) {},
    signOut(obj, { input }) {}
  }
}
