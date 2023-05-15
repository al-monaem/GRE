const mongoose = require('mongoose')
const moment = require('moment-timezone');

const examSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    sections: {
        type: Array,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "scheduled"
    }
})

// examSchema.pre('save', function (next) {
//     const startDate = moment.tz(this.startDate, 'Asia/Dhaka');
//     this.startDate = startDate;

//     const endDate = moment.tz(this.endDate, 'Asia/Dhaka');
//     this.endDate = endDate;
//     next();
// });

const Exam = mongoose.model('Exam', examSchema)
module.exports = Exam