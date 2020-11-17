
// Starts the server and has it listen on localhost 3002.

const app = require('./app')
const http = require('http')

const server = http.createServer(app)

const PORT = 3002
server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})

