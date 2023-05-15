const mongoose = require('mongoose')

const sectionSchema = mongoose.Schema({
    name:
    {
        type: String,
        required: true,
        unique: true,
    },
},
    {
        timestamps: true
    })

const Section = mongoose.model('Section', sectionSchema)
module.exports = Section