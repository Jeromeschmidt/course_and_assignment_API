const express = require('express')
const assignmentRoutes = require('./assignment.js')
const courseRoutes = require('./course.js')
const authRoutes = require('./auth.js')

const router = express.Router()

router.use('/assignments', assignmentRoutes)
router.use('/courses', courseRoutes)
router.use('/auth', authRoutes)

module.exports = router
