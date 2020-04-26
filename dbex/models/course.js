const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
  title: String,
  views: { type: Number, default: 0 },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  }
})

module.exports = mongoose.model("Course", courseSchema)
