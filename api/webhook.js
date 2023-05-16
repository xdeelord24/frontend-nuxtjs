// express app to receive webhook requests
// api/webhook.js
const express = require('express')
const axios = require('axios')
const app = express()
app.use(express.json()) // parse JSON body

app.post('/', async(req, res) => {
    try {
        // get data from webhook request
        const data = req.body
            // console.log("REQ")
            // console.log(data)
            // send response to webhook provider
        res.status(200).send('OK')
            // send webhook data to Nuxt.js server
        let out = await axios.post('http://localhost:3000/v2/api/webhook', { data })
            // console.log(out.config.data)
    } catch (e) {
        console.log(e)
    }
})
module.exports = app