
// Starts our server and has it listen on localhost 3002.

const app = require('./app')
const http = require('http')

const server = http.createServer(app)

const PORT = 3002
server.listen(PORT, () => {
    console.log(`server runnong on port ${PORT}`)
})

