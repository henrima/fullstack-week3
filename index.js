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
    .catch(error => {
      response.status(404).send(error)
    })
})

app.get('/api/persons/:id', (request, response) => {
  Person
    .findById(request.params.id)
    .then(person => {
      response.json(formatPerson(person))
    })
    .catch(error => {
      response.status(404).send(error)
    })
  })
  
  app.post('/api/persons', (request, response) => {
    const body = request.body

    const person = new Person({
      name: body.name,
      number: body.number,
    })
  
    person
    .save()
    .then(savedPerson => {
      response.json(formatPerson(savedPerson))
    })
    .catch(error => {
      response.status(400).send("Käyttäjän lisääminen epäonnistui: ", error)
    })    
  })  

  app.delete('/api/persons/:id', (request, response) => {
    Person
    .findByIdAndRemove(request.params.id)
    .then(
      response.status(204).send("Käyttäjä poistettu.")
    )
    .catch(error => {
      response.status(404).send(error)
    })
  })  

app.get('/info', (request, response) => {
  Person.collection.count().then(count => { 
    response.header("Content-Type", "application/json; charset=utf-8")
    response.write(`puhelinluettelossa on ${count} henkilön tiedot \n`)
    response.write(`${new Date()}`)
    response.end()
  })
})

app.put('/api/persons', (request, response) => {
  const body = request.body

  const editedPerson = {
    name: body.name,
    number: body.number
  }

  Person
    .findOneAndUpdate(formatPerson(editedPerson), { new: true } )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => {
      response.status(400).send({ error: 'malformatted iidee' })
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})