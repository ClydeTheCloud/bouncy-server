const mongoose = require('mongoose')

const scoreRecorderSchema = mongoose.Schema({
    name: { type: String, required: true, min: 3, max: 14, unique: true },
    score: { type: Number, required: true, min: 0, max: 99999 },
})

scoreRecorderSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
    },
})

const ScoreRecord = mongoose.model('ScoreRecord', scoreRecorderSchema)

module.exports = ScoreRecord
