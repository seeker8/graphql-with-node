const express = require("express")
const mongoose = require("mongoose")
const { graphqlExpress, graphiqlExpress } = require("graphql-server-express")
const { makeExecutableSchema } = require("graphql-tools")
const bodyParser = require("body-parser")
const { merge } = require("lodash")

const courseTypeDefs = require("./types/course.types")
const courseResolvers = require("./resolvers/course.resolvers")
const userTypeDefs = require("./types/user.types")
const userResolvers = require("./resolvers/user.resolvers")

const port = 3000
mongoose.connect("mongodb://localhost:27017/graphql_course", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const typeDefs = `
type Alert {
    message: String
}

type Query {
    _: Boolean
}

type Mutation {
    _: Boolean
}
`

const resolvers = {}

const schema = makeExecutableSchema({
  typeDefs: [courseTypeDefs, userTypeDefs, typeDefs],
  resolvers: merge(resolvers, courseResolvers, userResolvers)
})

const app = express()

app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema
  })
)

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
