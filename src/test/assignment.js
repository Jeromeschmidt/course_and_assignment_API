require('dotenv').config()
const app = require('../server.js')
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert

const Course = require('../models/course.js')
const Assignment = require('../models/assignment.js')

chai.config.includeStack = true

const expect = chai.expect
const should = chai.should()
chai.use(chaiHttp)

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {}
  mongoose.modelSchemas = {}
  mongoose.connection.close()
  done()
})

const SAMPLE_OBJECT_ID_Course = 'aaaaaaaaaaaa' // 12 byte string
const SAMPLE_OBJECT_ID_Assignment1 = 'bbbbbbbbbbbb' // 12 byte string
const SAMPLE_OBJECT_ID_Assignment2 = 'cccccccccccc' // 12 byte string
const sampleCourse = new Course({
    course: 'BEW_1.3',
    _id: SAMPLE_OBJECT_ID_Course
})


describe('Assignment API endpoints', () => {
    // Create a sample assignment and course for use in tests.
    beforeEach((done) => {
        const sampleCourse = new Course({
            course: 'BEW_1.3',
            _id: SAMPLE_OBJECT_ID_Course
        })
        // sampleUser.save()
        // console.log(sampleUser)
        const sampleAssignment = new Assignment({
            name: 'myassignment',
            link: 'www.google.com',
            dueDate: '3/1/2021',
            course: sampleCourse,
            _id: SAMPLE_OBJECT_ID_Assignment1
        })
        Promise.all([
             sampleCourse.save(),
             sampleAssignment.save()]
         )
         .then(() => {
             done()
         })
    })

    // Delete sample assignment and course.
    afterEach((done) => {
        deleteAssignment = Assignment.deleteOne({ _id: SAMPLE_OBJECT_ID_Assignment1 })
        deleteCourse = Course.deleteOne( {_id: SAMPLE_OBJECT_ID_Course })

        Promise.all([deleteAssignment, deleteCourse])
        .then(() => {
            done()
        })
    })

    it('should load all assignments', (done) => {
        chai.request(app)
        .get('/assignments')
        .end((err, res) => {
            if (err) { done(err) }
            expect(res).to.have.status(200)
            expect(res.body.assignments).to.be.an("array")
            done()
        })
    })

    it('should get one specific assignment', (done) => {
        // TODO: Complete this
        chai.request(app)
        .get(`/assignments/${SAMPLE_OBJECT_ID_Assignment1}`)
        .end((err, res) => {
            if (err) { done(err) }
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body.name).to.equal('myassignment')
            expect(res.body.link).to.equal('www.google.com')
            expect(res.body.dueDate).to.equal('3/1/2021')
            // expect(res.body.course).to.equal(sampleCourse)

            done()
        })
    })

    it('should post a new assignment', (done) => {
        // TODO: Complete this
        chai.request(app)
        .post('/assignments')
        .send({name: 'newassignment', link: 'www.yahoo.com', dueDate: '3/5/2021', course: SAMPLE_OBJECT_ID_Course})
        .end((err, res) => {
            if (err) { done(err) }
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('name', 'newassignment')

            // check that user is actually inserted into database
            Assignment.findOne({name: 'newassignment'}).then(message => {
                expect(message).to.be.an('object')
                done()
            })
        })
    })

    it('should update a Assignment', (done) => {
        // TODO: Complete this
        chai.request(app)
        .put(`/assignments/${SAMPLE_OBJECT_ID_Assignment1}`)
        .send({name: 'neweditedassignment'})
        .end((err, res) => {
            console.log(res)
            if (err) { done(err) }
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('name', 'neweditedassignment')
            done()
            // check that user is actually inserted into database
            Course.findOne({name: 'neweditedtitle'}).then(message => {
                expect(message).to.be.an('object')
                done()
            })
        })
    })

    it('should delete a assignment', (done) => {
        // TODO: Complete this
        chai.request(app)
        .delete(`/assignments/${SAMPLE_OBJECT_ID_Assignment1}`)
        .end((err, res) => {
            if (err) { done(err) }
            expect(res.body.message).to.equal('Successfully deleted.')
            expect(res.body._id).to.equal(SAMPLE_OBJECT_ID_Assignment1)

            // check that user is actually deleted from database
            Assignment.findOne({name: 'neweditedtitle'}).then(message => {
                expect(message).to.equal(null)
                done()
            })
        })
    })
})
