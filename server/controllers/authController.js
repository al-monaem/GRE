const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && await user.matchPassword(password)) {
        if (user.isAdmin === 1) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            })
        }
        else {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                sectionId: user.sectionId,
                examsTaken: user.examsTaken
            })
        }
        return
    }
    else {
        res.status(400)
        res.json({
            message: "Invalid email or password!"
        })
    }

})

module.exports = { login }