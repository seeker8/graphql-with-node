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

type Mutation {
    addCourse(title: String!, views: Int): Course
}
`)

const root = {
  getCourses() {
    return courses
  },
  getCourse({ id }) {
    return courses.find((course) => course.id === id)
  },
  addCourse({ title, views = 0 }) {
    const id = String(courses.length + 1)
    const newCourse = { id, title, views }
    courses.push(newCourse)
    return newCourse
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
