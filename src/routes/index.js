const express = require('express')
const assignmentRoutes = require('./assignment.js')
const courseRoutes = require('./course.js')

const router = express.Router()

router.use('/assignments', assignmentRoutes)
router.use('/courses', courseRoutes)

module.exports = router
