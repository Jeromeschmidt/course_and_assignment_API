const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AssignmentSchema = new Schema({
    name: { type: String, required: true },
    link: { type: String, required: true },
    dueDate: { type: String, required: true },
    course : { type: Schema.Types.ObjectId, ref: "Course", required: true },
})

const Assignment = mongoose.model('Assignment', AssignmentSchema)

module.exports = Assignment
