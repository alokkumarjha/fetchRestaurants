const express = require('express')
const app = express()
const routes = require('./routes')

const APP_VERSION = '/api/v1'

app.get('/', (req, res) => res.send('App is working'))

app.use(`${APP_VERSION}`, routes)

app.listen(3000, () => console.log('Restaurant fetching app listening on port 3000!'))

module.exports = {
  app
}