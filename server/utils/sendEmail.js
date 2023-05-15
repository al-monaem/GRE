require('dotenv').config();

const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_APP_PASSWORD
    },
    secure: true
})

const sendPassword = (to, password) => {

    const options = {
        from: process.env.GMAIL,
        to: to,
        subject: "Testing",
        text: `Password: ${password}`
    }

    transport.sendMail(options, (error, info) => {
        if (error) {
            console.log(error)
        }
        else {
            console.log("Email sent!")
        }
    })

}

module.exports = sendPassword