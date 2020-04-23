const express = require("express")
const { buildSchema } = require("graphql")
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
}
`)

app.get("/", (req, resp) => {
  resp.send("Welcome")
})

app.listen(3000, () => console.log("listening on port 3000"))
