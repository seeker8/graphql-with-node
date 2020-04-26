let courses = []
module.exports = {
  Query: {
    getCourses(obj, { page, limit }) {
      if (limit >= courses.length || page == undefined) return courses
      let start = page * limit - limit
      let end = start + limit
      return courses.slice(start, end)
    },
    getCourse(obj, { id }) {
      return courses.find((course) => course.id === id)
    }
  },
  Mutation: {
    addCourse(obj, { input }) {
      const { title, views = 0 } = input
      const id = String(courses.length + 1)
      const newCourse = { id, title, views }
      courses.push(newCourse)
      return newCourse
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
