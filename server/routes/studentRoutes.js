const express = require('express')
const { getExams, getAvailableExams, attendExam } = require('../controllers/studentExamController')
const router = express.Router()

router.route('/getExams').post(getExams)
router.route('/getAvailableExams').post(getAvailableExams)
router.route('/attendExam/:_id').get(attendExam)


module.exports = router