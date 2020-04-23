const express = require("express")
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  graphql
} = require("graphql")

const app = express()

const courseType = new GraphQLObjectType({
  name: "Course",
  fields: {
    title: { type: GraphQLString },
    views: { type: GraphQLInt }
  }
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      message: {
        type: GraphQLString,
        resolve() {
          return "Hola Mundo"
        }
      },
      course: {
        type: courseType,
        resolve() {
          return { title: "GraphQL course", views: 1000 }
        }
      }
    }
  })
})

app.get("/", (req, res) => {
  graphql(
    schema,
    `
      {
        message
        course {
          title
        }
      }
    `
  ).then((r) => res.send(r))
})

app.listen(3000, () => {
  console.log("server listening on port 3000")
})
