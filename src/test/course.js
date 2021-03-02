require('dotenv').config()
const app = require('../server.js')
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')

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

const SAMPLE_OBJECT_ID = 'aaaaaaaaaaaa' // 12 byte string

describe('Course API endpoints', () => {
    // Create a sample Course for use in tests.
    beforeEach((done) => {
        const sampleCourse = new Course({
            course: 'BEW_1.3',
            _id: SAMPLE_OBJECT_ID
        })
        sampleCourse.save()
        .then(() => {
            done()
        })
    })

    // Delete sample user.
    afterEach((done) => {
        Course.deleteMany({ course: ['BEW_1.3', 'BEW_2.5', 'DS_2.4'] })
        .then(() => {
            done()
        })
    })

    it('should load all Courses', (done) => {
        chai.request(app)
        .get('/courses')
        .end((err, res) => {
            if (err) { done(err) }
            expect(res).to.have.status(200)
            expect(res.body.courses).to.be.an("array")
            done()
        })
    })

    it('should get one Course', (done) => {
        chai.request(app)
        .get(`/courses/${SAMPLE_OBJECT_ID}`)
        .end((err, res) => {
            if (err) { done(err) }
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body.course).to.equal('BEW_1.3')
            done()
        })
    })

    it('should post a new Course', (done) => {
        chai.request(app)
        .post('/courses')
        .send({course: 'BEW_2.5'})
        .end((err, res) => {
            if (err) { done(err) }
            expect(res.body.course).to.be.an('object')
            expect(res.body.course).to.have.property('course', 'BEW_2.5')

            // check that user is actually inserted into database
            Course.findOne({course: 'BEW_2.5'}).then(course => {
                expect(course).to.be.an('object')
                done()
            })
        })
    })

    it('should update a Course', (done) => {
        chai.request(app)
        .put(`/courses/${SAMPLE_OBJECT_ID}`)
        .send({course: 'DS_2.4'})
        .end((err, res) => {
            if (err) { done(err) }
            expect(res.body.course).to.be.an('object')
            expect(res.body.course).to.have.property('course', 'DS_2.4')

            // check that user is actually inserted into database
            Course.findOne({course: 'DS_2.4'}).then(course => {
                expect(course).to.be.an('object')
                done()
            })
        })
    })

    it('should delete a Course', (done) => {
        chai.request(app)
        .delete(`/courses/${SAMPLE_OBJECT_ID}`)
        .end((err, res) => {
            if (err) { done(err) }
            expect(res.body.message).to.equal('Successfully deleted.')
            expect(res.body._id).to.equal(SAMPLE_OBJECT_ID)

            // check that user is actually deleted from database
            Course.findOne({course: 'BEW_1.3'}).then(user => {
                expect(user).to.equal(null)
                done()
            })
        })
    })
})
