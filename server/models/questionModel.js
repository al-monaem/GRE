const mongoose = require('mongoose')

const questionSchema = mongoose.Schema(
    {
        examId: {
            type: String,
            required: true,
            ref: 'exam'
        },
        questions: {
            type: Array
        }
    }
)

const Question = mongoose.model('Question', questionSchema)
module.exports = Question