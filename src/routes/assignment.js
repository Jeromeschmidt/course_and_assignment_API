const express = require('express')
const router = express.Router();

// User -> course
// message -> assignment
const Course = require('../models/course')
const Assignment = require('../models/assignment')

/** Route to get all assignments. */
router.get('/', (req, res) => {
    // TODO: Get all Assignment objects using `.find()`
    // TODO: Return the Assignment objects as a JSON list
    Assignment.find({}).lean()
    // Return the assignments objects as a JSON list
    .then(assignments => {
        return res.json({assignments})
    }).catch(err => {
        throw err.message
    })
})

/** Route to get one Assignment by id. */
router.get('/:assignmentId', (req, res) => {
    // TODO: Get the Assignment object with id matching `req.params.id`
    // using `findOne`
    // return Assignment.findById(req.params.messageId)
    // TODO: Return the matching Assignment object as JSON
    Assignment.findOne({_id: req.params.assignmentId})
    .then(result => {
        res.json(result)
    }).catch(err => {
        throw err.message
    })
})

/** Route to add a new assignment. */
router.post('/', (req, res) => {
    let assignment = new Assignment(req.body)
    assignment.save()
    // .then(assignmentResult => {
    //     res.redirect(`/`)
    .then(assignment => {
        return Course.findById(assignment.course)
    })
    .then(course => {
    //     // console.log(user)
        course.assignments.unshift(assignment)
        return course.save()
    // })
    .then(() => {
        return res.send(assignment)
    }).catch(err => {
        throw err.message
    })
})
})

/** Route to update an existing assignment. */
router.put('/:assignmentId', (req, res) => {
    // TODO: Update the matching message using `findByIdAndUpdate`

    // TODO: Return the updated Message object as JSON
    Assignment.findByIdAndUpdate(req.params.assignmentId, req.body).then(() => {
        return Assignment.findOne({_id: req.params.assignmentId})
    }).then((assignment) => {
        return res.json(assignment)
    }).catch((err) => {
        throw err.message
    })
})

/** Route to delete a assignment. */
router.delete('/:assignmentId', (req, res) => {
    // TODO: Delete the specified Assignment using `findByIdAndDelete`. Make sure
    // to also delete the assignment from the Courses object's `sssignment` array

    // TODO: Return a JSON object indicating that the Message has been deleted
    Assignment.findByIdAndDelete(req.params.assignmentId).then((result) => {
        if (result === null) {
            return res.json({message: 'Assignment does not exist.'})
        }
        return res.json({
            'message': 'Successfully deleted.',
            '_id': req.params.assignmentId
        })
    })
    .catch((err) => {
        throw err.message
    })
})

module.exports = router
