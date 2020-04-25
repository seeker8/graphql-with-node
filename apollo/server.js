const { ApolloServer } = require("apollo-server")
const { makeExecutableSchema } = require("graphql-tools")
const courses = require("./courses")

const typeDefs = `
type Course {
    id: ID!
    title: String!
    views: Int
}

type Query {
    getCourses(page: Int, limit: Int = 1): [Course]
    getCourse(id: ID!): Course
}
`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      getCourses(obj, { page, limit }) {
        if (limit >= courses.length || page == undefined) return courses
        let start = page * limit - limit
        let end = start + limit
        return courses.slice(start, end)
      }
    }
  }
})

const server = new ApolloServer({
  schema
})

server.listen().then(({ url }) => {
  console.log(`Server started on ${url}`)
})
