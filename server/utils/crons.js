const cron = require('node-cron')
const asyncHandler = require('express-async-handler')

const Exam = require('../models/examModel')

const scheduleExamCron = asyncHandler(async (_id, startDate, endDate) => {

    return new Promise((resolve, reject) => {
        try {
            const startSchedule = `${startDate.getSeconds()} ${startDate.getMinutes()} ${startDate.getHours()} ${startDate.getDate()} ${startDate.getMonth() + 1} *`;
            const endSchedule = `${endDate.getSeconds()} ${endDate.getMinutes()} ${endDate.getHours()} ${endDate.getDate()} ${endDate.getMonth() + 1} *`;
            startJob = cron.schedule(startSchedule, async () => {
                console.log("Started")
                //job
                await Exam.findOneAndUpdate({ _id }, { $set: { status: "running" } }, { new: true });

                startJob.destroy()
            }, {
                scheduled: true,
                timezone: "Asia/Dhaka"
            })

            endJob = cron.schedule(endSchedule, async () => {
                console.log("Started")
                //job
                await Exam.findOneAndUpdate({ _id }, { $set: { status: "closed" } }, { new: true });

                endJob.destroy()
            }, {
                scheduled: true,
                timezone: "Asia/Dhaka"
            })

            resolve("Job scheduled successfully")
        } catch (error) {
            reject(error)
        }
    })
})

module.exports = { scheduleExamCron }