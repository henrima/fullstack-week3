const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const url = process.env.MLAB_URI

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

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
  
    // return response.status(200).json(persons)

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
  
    if ( person ) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  const generateId = () => {
      min = Math.ceil(1)
      max = Math.floor(1000000)
    return Math.floor(Math.random() * (max -min +1)) + min
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.number === undefined || body.name === undefined) {
      return response.status(406).json({error: 'name or number is missing'})
    }

    if (persons.find(person => person.name === body.name)) {
        return response.status(409).json({error: 'duplicate name'})
    }

    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    }
  
    persons = persons.concat(person)
  
    response.json(person)
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