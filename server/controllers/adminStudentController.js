const asyncHandler = require('express-async-handler')
const User = require("../models/userModel")
const sendPassword = require('../utils/sendEmail')
const { generateRandomString, encryptPassword } = require('../utils/generatePass')

const register = asyncHandler(async (req, res) => {

    const { name, email, sectionId, isAdmin = false } = req.body;
    const s = await User.findOne({ email })

    if (s) {
        res.status(400)
        throw new Error("User already exists!")
    }

    const password = generateRandomString(10)
    const encryptPass = await encryptPassword(password)

    const student = await User.create({
        name,
        email,
        sectionId,
        password: encryptPass,
        isAdmin
    })

    if (student) {
        sendPassword(student.email, password)
        res.json({
            id: student._id,
            email: email,
            sectionId: sectionId,
            examsTaken: student.examsTaken
        })
    } else {
        res.status(500)
    }
})

module.exports = { register }