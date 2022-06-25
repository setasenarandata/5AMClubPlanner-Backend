const express = require('express')
const getFirstHour = require('./services/firstHour.js')
const getFiveGoals = require('./services/fiveGoals')
const PORT = process.env.PORT || 5050

const app = express()

app.get('/firstHour', async (req, res) => {
    const notionData = await getFirstHour()
    res.json(notionData)
})

app.get('/fiveGoals', async (req, res) => {
    const notionData = await getFiveGoals()
    res.json(notionData)
})

app.listen(PORT, console.log(`Server Running on PORT:${PORT}`))
// const notionContent = await getContent()
// console.log(notionContent)
