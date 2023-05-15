const express = require('express')
const dotenv = require('dotenv')
const connect = require('./config/db')
const cors = require('cors')
const adminRoutes = require('./routes/adminRoutes')
const authRoutes = require('./routes/authRoutes')
const studentRoutes = require('./routes/studentRoutes')

const { NotFound, ErrorHandler } = require('./middlewares/errorMiddleware')

const app = express()

dotenv.config()
connect()
app.use(cors())
app.use(express.json())

app.use('/api/admin', adminRoutes)
app.use('/api/auth', authRoutes)

app.use('/api/student', studentRoutes)

app.use(NotFound)
app.use(ErrorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`)
})