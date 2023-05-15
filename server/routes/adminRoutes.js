const express = require('express')
const { createSection, getSections } = require('../controllers/adminSectionController')
const { scheduleExam } = require('../controllers/adminExamController')
const { register } = require('../controllers/adminStudentController')
const router = express.Router()

router.route('/createSection').post(createSection)
router.route('/getSections').get(getSections)
router.route('/scheduleExam').post(scheduleExam)
router.route('/register').post(register)

module.exports = router