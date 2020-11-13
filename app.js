// Configures our server and adds middleware and routing.

const express = require('express')
const app = express()
const cors = require('cors')
const ticketRouter =require('./controllers/tickets')

const logger = require('./utils/logger')

app.use(express.static('build'))

// json parser takes JSON date of a request and converts it to JavaScript and attaches it to request.body

app.use(express.json())
 
// Allows our frontend app to access this server.
app.use(cors())

app.use('/api/tickets/', ticketRouter)

module.exports = app