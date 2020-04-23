const express = require("express")

const app = express()

app.get("/", (req, resp) => {
  resp.send("Welcome")
})

app.listen(3000, () => console.log("listening on port 3000"))
