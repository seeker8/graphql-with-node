const { ApolloServer } = require("apollo-server")
const { makeExecutableSchema } = require("graphql-tools")

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
  resolvers: {}
})

const server = new ApolloServer({
  schema
})

server.listen().then(({ url }) => {
  console.log(`Server started on ${url}`)
})
