const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
  title: String,
  views: { type: Number, default: 0 }
})

module.exports = mongoose.model("Course", courseSchema)
