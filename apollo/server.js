const { ApolloServer } = require("apollo-server")
const { makeExecutableSchema } = require("graphql-tools")
const courses = require("./courses")

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

type Mutation {
    addCourse(input: CourseInput): Course
}
`

const resolvers = {
  Query: {
    getCourses(obj, { page, limit }) {
      if (limit >= courses.length || page == undefined) return courses
      let start = page * limit - limit
      let end = start + limit
      return courses.slice(start, end)
    }
  },
  Mutation: {
    addCourse(obj, { input }) {
      const { title, views = 0 } = input
      const id = String(courses.length + 1)
      const newCourse = { id, title, views }
      courses.push(newCourse)
      return newCourse
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
