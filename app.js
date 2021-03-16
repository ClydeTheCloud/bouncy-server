const express = require('express')
const app = express()
const mongoose = require('mongoose')
const staticRouter = express.Router()
const path = require('path')

const config = require('./utils/config')
const scoreRouter = require('./controllers/scores')
const middleware = require('./utils/middleware')

staticRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/index.html'))
})

console.log('connecting to DB')
mongoose
    .connect(config.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log('connected'))
    .catch(err => console.log('failed to connect', err))

app.use(express.json())
app.use('/score/', scoreRouter)
app.use(express.static('static'))
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
