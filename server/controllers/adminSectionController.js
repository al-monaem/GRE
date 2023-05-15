const asyncHandler = require('express-async-handler')
const Section = require("../models/sectionModel")


const createSection = asyncHandler(async (req, res) => {
    const { name } = req.body
    const exist = await Section.find({
        name: name
    })
    if (exist.length > 0) {
        res.status(400).json({
            message: "Name already exists"
        })
        return
    }

    const section = await Section.create({
        name,
    })

    if (section)
        res.status(201).json(section)
    else {
        res.status(400)
        throw new Error("Error occurred!")
    }
})


const getSections = asyncHandler(async (req, res) => {
    const sections = await Section.find()
    res.json(sections)
})

module.exports = { createSection, getSections }