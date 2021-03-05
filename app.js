const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const scoreRouter = require('./controllers/scores')
const middleware = require('./utils/middleware')

console.log('connecting to DB')
mongoose
    .connect(config.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log('connected'))
    .catch(err => console.log('failed to connect', err))

app.use(cors())
app.use(express.json())
app.use('/score/', scoreRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
