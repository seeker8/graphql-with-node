const express = require("express")
const { buildSchema } = require("graphql")
const graphqlHttp = require("express-graphql")
const courses = require("./courses")

const app = express()

const schema = buildSchema(`
type Course {
    id: ID!
    title: String!
    views: Int
}

type Query {
    getCourses: [Course]
    getCourse(id: ID!): Course
}
`)

const root = {
  getCourses() {
    return courses
  },
  getCourse({ id }) {
    console.log("getCourse" + id)
    return courses.find((course) => course.id === id)
  }
}

app.get("/", (req, resp) => {
  resp.send("Welcome")
})

app.use(
  "/graphql",
  graphqlHttp({
    schema,
    rootValue: root,
    graphiql: true
  })
)

app.listen(3000, () => console.log("listening on port 3000"))
