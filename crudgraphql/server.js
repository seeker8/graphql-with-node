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

input CourseInput {
    title: String!
    views: Int
}

type Query {
    getCourses: [Course]
    getCourse(id: ID!): Course
}

type Mutation {
    addCourse(input: CourseInput): Course
    updateCourse(id:ID!, input: CourseInput): Course
}
`)

const root = {
  getCourses() {
    return courses
  },
  getCourse({ id }) {
    return courses.find((course) => course.id === id)
  },
  addCourse({ input }) {
    const { title, views = 0 } = input
    const id = String(courses.length + 1)
    const newCourse = { id, title, views }
    courses.push(newCourse)
    return newCourse
  },
  updateCourse({ id, input }) {
    const { title, views } = input
    const course = courses.find((course) => course.id === id)
    course.title = title || course.title
    course.views = views || course.views
    return course
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
