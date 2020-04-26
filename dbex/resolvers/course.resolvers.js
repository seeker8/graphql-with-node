const Course = require("../models/course")

let courses = []
module.exports = {
  Query: {
    async getCourses(obj, { page, limit }) {
      const courses = await Course.find()
      return courses
    },
    async getCourse(obj, { id }) {
      return await Course.findById(id)
    }
  },
  Mutation: {
    async addCourse(obj, { input }) {
      const course = new Course(input)
      await course.save()
      return course
    },
    async updateCourse(obj, { id, input }) {
      return await Course.findByIdAndUpdate(id, input)
    },
    async deleteCourse(obj, { id }) {
      const result = await Course.deleteOne({ _id: id })
      return { message: `${result.deletedCount} element(s) removed.` }
    }
  }
}
