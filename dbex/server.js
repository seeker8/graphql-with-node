const express = require("express")
const mongoose = require("mongoose")

const port = 3000
mongoose.connect("mongodb://localhost:27017/graphql_course", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const app = express()

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
