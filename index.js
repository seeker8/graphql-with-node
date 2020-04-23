const express = require("express")
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  graphql,
} = require("graphql")

const app = express()

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      message: {
        type: GraphQLString,
        resolve() {
          return "Hola Mundo"
        },
      },
    },
  }),
})

app.get("/", (req, res) => {
  graphql(
    schema,
    `
      {
        message
      }
    `
  ).then((r) => res.send(r))
})

app.listen(3000, () => {
  console.log("server listening on port 3000")
})
