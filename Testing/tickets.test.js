
// This file is for testing our API calls and ensuring they return the expected responses.
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

test('Get tickets first page returns 25 tickets.', async() => {

  const response = await api
    .get(`/api/tickets/page/2`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    expect(response.body.tickets).toHaveLength(25)
   
})
    
test('Get ticket count returns number.', async() => {

    const response = await api
    .get('/api/tickets/count')
    .expect(200)
    expect(response.body).toBeGreaterThanOrEqual(0)
    
})

test('Get id return the correct ticket.', async() => {
    const response = await api
    .get(`/api/tickets/id/3`)
    .expect(200)
    expect(response.body.results[0].id).toEqual(3)
})


