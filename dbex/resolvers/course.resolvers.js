const Course = require("../models/course")
const User = require("../models/user")

module.exports = {
  Query: {
    async getCourses(obj, { page, limit }) {
      let courses = Course.find()
      if (page) {
        courses = courses.limit(limit).skip(page * limit - limit)
      }
      return await courses
    },
    async getCourse(obj, { id }) {
      return await Course.findById(id)
    }
  },
  Mutation: {
    async addCourse(obj, { input, userId }) {
      const user = await User.findById(userId)
      const course = new Course({ ...input, user: userId })
      await course.save()
      user.courses.push(course)
      await user.save()
      return course
    },
    async updateCourse(obj, { id, input }) {
      return await Course.findByIdAndUpdate(id, input)
    },
    async deleteCourse(obj, { id }) {
      const result = await Course.deleteOne({ _id: id })
      return { message: `${result.deletedCount} element(s) removed.` }
    }
  },
  Course: {
    async user(course) {
      return await User.findById(course.user)
    }
  }
}
