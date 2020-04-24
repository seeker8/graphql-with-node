const express = require("express")
const { buildSchema } = require("graphql")
const graphqlHttp = require("express-graphql")
let courses = require("./courses")

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
`)

const root = {
  getCourses({ page, limit }) {
    if (limit >= courses.length) return courses
    let start = page * limit - limit
    let end = start + limit
    return courses.slice(start, end)
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
  },
  deleteCourse({ id }) {
    courses = courses.filter((course) => course.id != id)
    return { message: `The course ${id} has been removed.` }
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
