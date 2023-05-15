const asyncHandler = require('express-async-handler')
//const Section = require("../models/sectionModel")
const Exam = require("../models/examModel")
const Question = require("../models/questionModel")
const { scheduleExamCron } = require('../utils/crons')

const scheduleExam = asyncHandler(async (req, res) => {

    const { examName, examType, sections, startDate, endDate, questions } = req.body

    if (new Date(startDate) > new Date(endDate)) {
        res.status(400)
        throw new Error("Starting date cannot be lower than ending date")
    }
    else {
        const exam = await Exam.create({
            name: examName,
            type: examType,
            sections,
            startDate,
            endDate
        })

        const question = await Question.create({
            examId: exam._id,
            questions: questions
        })

        const result = await scheduleExamCron(exam._id, exam.startDate, exam.endDate)
        console.log(result)

        res.status(201).json({
            ...exam,
            questions: questions
        })
    }
})

module.exports = { scheduleExam }