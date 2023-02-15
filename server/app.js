// Requiring necessary files
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

// Configuring .env
process.env.NODE_ENV === 'development' && require('dotenv').config()
const PORT = process.env.PORT || 3001

// Database configuration
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
})
    .then(() => console.log('DB CONNECTED'))
    .catch(err => console.log('ERROR : ', err))

// Requiring models
require('./models/User')
require('./models/Transaction')

// Requiring middleware
const authenticate = require('./middlewares/authenticate')

// Using app feature
app.use(express.json())
app.use(cors())

// Requiring route files
const authRoute = require('./routes/authRoute')
const accountsRoute = require('./routes/accountsRoute')

// Routes
app.get("/", authenticate, (req, res) => {
    const { user } = req
    res.status(200).json({
        success: true,
        email: user.email
    })
})
// Using routes
app.use(authRoute)
app.use(accountsRoute)

// App listener
app.listen(PORT, () => console.log(`AUTH SERVER STARTED ON PORT ${PORT}`))