const mongoose = require('mongoose')

const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "GRE"
        })

        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (err) {
        console.log(`Error: ${err.message}`)
        process.exit()
    }
}

module.exports = connect