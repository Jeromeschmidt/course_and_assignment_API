const express = require('express')
const router = express.Router()

// User -> course
// message -> assignment
const Course = require('../models/course')
const Assignment = require('../models/assignment')

/** Route to get all users. */
// GET localhost:3000/users/
router.get('/', (req, res) => {
    Course.find().then((courses) => {
        return res.json({courses})
    })
    .catch((err) => {
        throw err.message
    });
})

/** Route to get one user by id. */
// GET localhost:3000/users/:userId
router.get('/:courseId', (req, res) => {
    Course.findOne({_id: req.params.courseId})
    .then(result => {
        res.json(result)
    }).catch(err => {
        throw err.message
    })
})

/** Route to add a new user to the database. */
router.post('/', (req, res) => {
    // POST localhost:3000/users/
    let course = new Course(req.body)
    course.save().then(courseResult => {
        return res.json({course: courseResult})
    }).catch((err) => {
        throw err.message
    })
})

/** Route to update an existing user. */
// PUT localhost:3000/users/:userId
router.put('/:courseId', (req, res) => {
    Course.findByIdAndUpdate(req.params.courseId, req.body).then(() => {
        return Course.findOne({_id: req.params.courseId})
    }).then((course) => {
        return res.json({course})
    }).catch((err) => {
        throw err.message
    })
})

/** Route to delete a user. */
// DELETE localhost:3000/users/:userId
router.delete('/:courseId', (req, res) => {
    Course.findByIdAndDelete(req.params.courseId).then((result) => {
        if (result === null) {
            return res.json({message: 'Course does not exist.'})
        }
        return res.json({
            'message': 'Successfully deleted.',
            '_id': req.params.courseId
        })
    })
    .catch((err) => {
        throw err.message
    })
})

module.exports = router
