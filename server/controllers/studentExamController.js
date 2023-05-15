const asyncHandler = require('express-async-handler')
const Exam = require('../models/examModel')
const { startExam } = require('../utils/crons')

const getExams = asyncHandler(async (req, res) => {

    const { sectionId } = req.body

    const exams = (await Exam.find()).filter((exam) => exam.sections.includes(sectionId))
    res.json(exams)
})

const getAvailableExams = asyncHandler(async (req, res) => {

    const { sectionId } = req.body

    const exams = (await Exam.find()).filter((exam) => {
        if (exam.sections.includes(sectionId) && exam.status.toLowerCase() !== "closed")
            return exam
    })
    res.json(exams)
})

const attendExam = asyncHandler(async (req, res) => {
    const { _id } = req.params

    const exam = await Exam.findById(_id)
    const status = exam.status
    startExam(_id, exam.startDate)

    if (status.toLowerCase() === "scheduled") {
        console.log("asd")
        res.json({
            error: {
                message: "Exam not started yet."
            }
        })
    }
    else if (status.toLowerCase() === "closed") {
        res.json({
            error: {
                message: "Exam already closed."
            }
        })
    }
    else {
        res.json(_id)
        startExam()
    }

})

module.exports = { getExams, getAvailableExams, attendExam }