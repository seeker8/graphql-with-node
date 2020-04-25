const { ApolloServer } = require("apollo-server")
const { makeExecutableSchema } = require("graphql-tools")
let courses = require("./courses")

const typeDefs = `
type Course {
    id: ID!
    title: String!
    views: Int
}

input CourseInput {
    title: String!
    views: Int
}

type Query {
    getCourses(page: Int, limit: Int = 1): [Course]
    getCourse(id: ID!): Course
}

type Alert {
    message: String
}

type Mutation {
    addCourse(input: CourseInput): Course
    updateCourse(id:ID!, input: CourseInput): Course
    deleteCourse(id:ID!): Alert
}
`

const resolvers = {
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

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const server = new ApolloServer({
  schema
})

server.listen().then(({ url }) => {
  console.log(`Server started on ${url}`)
})
