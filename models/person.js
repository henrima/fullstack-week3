const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dotenv = require('dotenv')
dotenv.config()

const url = process.env.MLAB_URI

mongoose.connect(url)

const personSchema = new Schema({  
    name: {
    type: String,
    required: [true, 'Henkilöllä pitää olla nimi.']
},
    number: {
        type: String,
        required: [true, 'Henkilöllä pitää olla numero.']
    }    
})

const Person = mongoose.model('Person', personSchema)

// personSchema.methods.format = function(person, cb) {
//     const filteredPerson = {
//         "name": person.name,
//         "number": person.number,
//         "id": person._id
//     }
//     format.addCallback(function () {
//         console.log('Person filtered.')
//     }, cb)
//   }


module.exports = Person