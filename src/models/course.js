const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
    course: { type: String, required: true },
    assignments : [{ type: Schema.Types.ObjectId, ref: "Assignment" }]
  })

CourseSchema.pre('findOne', function (next) {
    this.populate('assignments')
    next()
})

CourseSchema.pre('find', function (next) {
    this.populate('assignments')
    next()
})

const Course = mongoose.model('Course', CourseSchema)

module.exports = Course
