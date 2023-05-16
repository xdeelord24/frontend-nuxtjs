import axios from 'axios'

const apiUrl = process.env.API_URL || 'http://localhost:1337/api'
const newUrl = process.env.API_URL || 'http://localhost:1337'
const webhookUrl = process.env.API_URL || 'ws://localhost:3001'

export default function(ctx, inject) {
    const strapi = axios.create({
        baseURL: apiUrl,
        apiURL: newUrl,
        socketURL: webhookUrl,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })

    ctx.$strapi = strapi
    inject('strapi', strapi)
}