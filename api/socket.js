const http = require('http');
const WebSocket = require('ws');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

const express = require('express')
    // const axios = require('axios')
const app = express()
app.use(express.json()) // parse JSON body

const clients = []

wss.on('connection', (ws) => {
    clients.push(ws) // store the connected WebSocket object

    app.post('/', async(req, res) => {
        try {
            // get data from webhook request
            const data = req.body
                // console.log(data)

            // send response to webhook provider
            res.status(200).send('OK')

            // console.log('Client connected');
            // send the data to all connected clients
            clients.forEach(client => {
                client.send(JSON.stringify(data))
            })
        } catch (e) {
            console.log(e)
        }
    })
});

server.listen(3001, () => {
    console.log('Server running on port 3001');
});

module.exports = app