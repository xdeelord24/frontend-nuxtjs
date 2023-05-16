// server-middleware/webhook.js
const express = require('express')
const app = express()

app.use(express.json()) // parse JSON body

app.post('/', (req, res) => {
    // get data from webhook request
    const data = req.body
        // do something with data
    console.log(data)
        // send response to webhook provider
    res.status(200).send('OK')
})

module.exports = app