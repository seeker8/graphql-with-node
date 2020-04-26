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
    updateCourse(obj, { id, input }) {
      const { title, views } = input
      const course = courses.find((course) => course.id === id)
      course.title = title || course.title
      course.views = views || course.views
      return course
    },
    deleteCourse(obj, { id }) {
      courses = courses.filter((course) => course.id != id)
      return { message: `The course ${id} has been removed.` }
    }
  }
}
