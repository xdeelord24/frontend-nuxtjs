// In middleware/strapi-webhook.js

export default async function(req, res, next) {
    const event = await req.body;

    // Process the incoming webhook data
    // ...
    console.log(event)
    res.status(200).send('OK');
}