const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())

morgan.token('content', function showContent (request) {
    return `${JSON.stringify(request.body)}`
  })
app.use(morgan(':method :url :content :status - :response-time'))


const formatPerson = (person) => {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then(people => {
      response.json(people.map(formatPerson))
    })
})

app.get('/api/persons/:id', (request, response) => {
  Person
    .findById(request.params.id)
    .then(person => {
      response.json(formatPerson(person))
    })
  })
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body.number)

    // if (body.number === undefined || body.number === '' || body.name === undefined || body.name === '') {
    //   return response.status(406).json({error: 'name or number is missing'})
    // }


    // if (persons.find(person => person.name === body.name)) {
    //     return response.status(409).json({error: 'duplicate name'})
    // }

    const person = new Person({
      name: body.name,
      number: body.number,
    })
  
    person
    .save()
    .then(savedPerson => {
      response.json(formatPerson(savedPerson))
    })
  })  

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })  

app.get('/info', (request, response) => {
    res.header("Content-Type", "application/json; charset=utf-8");
    res.write(`puhelinluettelossa on ${persons.length} henkilön tiedot \n`)
    res.write(`${new Date()}`)
    res.end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})