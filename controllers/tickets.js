
//Routing and logic for accessing the Zendesk ticket API
require('dotenv').config()
const ticketRouter = require('express').Router()

let pages = "https://ticketviewer.zendesk.com/api/v2/incremental/tickets/cursor.json?per_page=25&start_time=1332034771"
let nextPage = pages
const count = 'https://ticketviewer.zendesk.com/api/v2/tickets/count.json'
const byId = 'https://ticketviewer.zendesk.com/api/v2/search.json?query='
const axios = require('axios')

// Recursive function used to move the cursor through the ticket API to the desired page and return it.
const cursorThroughPages = (i, pageRequested, response) => {

    if (i < pageRequested) {
        

            axios.get(nextPage, {
                auth: {
                    username: process.env.zendeskAccount,
                    password: process.env.ZendeskPassword
                }

            }).then(res => {
                if (res.data.after_url != null) {
                    nextPage = res.data.after_url, i++, cursorThroughPages(i, pageRequested, response)
                }
                else {
                    response.status(400).json({ error: 'Reached end of tickets.' })
                }
            })
        }

    else {
        axios.get(nextPage, {
         
            auth: {
                username: process.env.zendeskAccount,
                password: process.env.ZendeskPassword

            }
        })
        .then(res => {
            response.json(res.data)
        })
            .catch(err => { response.status(500).json({ error: 'No tickets returned.' }) })
    }
}

// Get a certain page of tickets(in increments of 25 tickets).
ticketRouter.get('/page/:page', (request, response) => {
    let pageRequested = Number(request.params.page)
    nextPage = pages
    let i = 0
    cursorThroughPages(i, pageRequested, response)
})

// Get the number of tickets in the account(used to set the number of pages).
ticketRouter.get('/count', (request, response) => {

    axios.get(count, {
      
        auth: {
            username: process.env.zendeskAccount,
            password: process.env.ZendeskPassword

        }
    }).then(res => { console.log(res.data.count.value), response.json(res.data.count.value) })
        .catch(err => { response.status(500).json({ error: `failed to get ticket count ${err} ` }) })
})

// Get a ticket by Id.
ticketRouter.get('/id/:id', (request, response) => {

    let id = Number(request.params.id)
    let searchURL = byId.concat(id)
    axios.get(searchURL, {
        auth: {
            username: process.env.zendeskAccount,
            password: process.env.ZendeskPassword
        }
    })
    .then(res => { response.json(res.data) })
        .catch(err => { response.status(500).json({ error: 'no ticket with this Id' }) })

})

module.exports = ticketRouter


