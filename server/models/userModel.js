const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    sectionId: {
        type: String,
        ref: "Section",
    },
    examsTaken: {
        type: Array
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
},
    {
        timestamps: true
    })


userSchema.methods.matchPassword = async function (pass) {
    return await bcrypt.compare(pass, this.password)
}

const User = mongoose.model('user', userSchema)

module.exports = User