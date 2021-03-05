const scoreRouter = require('express').Router()

const ScoreRecord = require('../models/scoreRecord')

async function getTopTenWithPlayerPosition(name) {
    const scoreRecords = await ScoreRecord.find({})
    const sortedScoreRecords = scoreRecords.sort((a, b) => b.score - a.score)
    const topTen = sortedScoreRecords.slice(0, 10)

    const personal = sortedScoreRecords.find(record => record.name === name).toJSON()
    personal.position = sortedScoreRecords.findIndex(record => record.name === name) + 1

    return {
        leaderboard: topTen.map(r => r.toJSON()),
        personal,
    }
}

scoreRouter.get('/', async (req, res) => {
    let topTen
    const scoreRecords = await ScoreRecord.find({})

    if (scoreRecords.length === 0) {
        return res.json('No scores yet. :c')
    } else {
        topTen = scoreRecords
            .sort((a, b) => b.score - a.score)
            .slice(0, 10)
            .map(r => r.toJSON())
        return res.json(topTen)
    }
})

scoreRouter.get('/:name', async (req, res) => {
    const scoreRecord = await ScoreRecord.findOne({ name: req.params.name })
    if (scoreRecord) {
        res.json(scoreRecord.toJSON())
    } else {
        res.json('No score record found.')
    }
})

scoreRouter.post('/', async (req, res) => {
    const nameRegExp = new RegExp(/^[a-z0-9]+$/i)

    if (req.body.name.length < 3 || req.body.name.length > 14 || !nameRegExp.test(req.body.name)) {
        return res.status(422).json({
            error: 'Invalid name',
        })
    }

    if (req.body.score < 0 || req.body.score > 99999) {
        return res.status(422).json({
            error: 'Invalid score',
        })
    }

    const scoreRecord = await ScoreRecord.findOne({ name: req.body.name })

    if (scoreRecord && req.body.score > scoreRecord.score) {
        // record updated with new score
        await ScoreRecord.updateOne({ name: req.body.name }, { score: req.body.score })
        res.status(200).json(await getTopTenWithPlayerPosition(req.body.name))
    } else if (!scoreRecord) {
        // record created
        const score = new ScoreRecord({ name: req.body.name, score: req.body.score })
        await score.save()
        res.status(201).json(await getTopTenWithPlayerPosition(req.body.name))
    } else {
        res.status(202).json(await getTopTenWithPlayerPosition(req.body.name))
    }
})

module.exports = scoreRouter
