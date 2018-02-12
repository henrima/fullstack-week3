const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const url = process.env.MLAB_URI

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: {
      type: String,
      required: [true, 'Henkilöllä pitää olla nimi.']
  },
  number: {
      type: String,
      required: [true, 'Henkilöllä pitää olla numero.']
    }    
})

module.exports = Person