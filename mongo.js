const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const url = process.env.MLAB_URI

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

const person = new Person({
  name: process.argv[2],
  number: process.argv[3]
})
if (person.name) {
    person
    .save()
    .then(response => {
        console.log(`lisätään henkilö ${person.name} numero ${person.number} luetteloon`)
        mongoose.connection.close()
    })
} else {
    Person
    .find({})
    .then(result => {
        console.log("puhelinluettelo:")
        result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}