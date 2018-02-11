const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())
app.use(morgan('tiny', {
    skip: function (req, res) { return res.statusCode < 400 }
}))

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Arto Järvinen",
        number: "040-123456",
        id: 2
    },
    {
        name: "Martti Tienari",
        number: "040-123456",
        id: 3
    },
    {
        name: "Lea Kutvonen",
        number: "040-123456",
        id: 4
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

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

app.get('/info', (req, res) => {
    res.header("Content-Type", "application/json; charset=utf-8");
    res.write(`puhelinluettelossa on ${persons.length} henkilön tiedot \n`)
    res.write(`${new Date()}`)
    res.end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
  