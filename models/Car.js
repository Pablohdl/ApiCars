const mongoose = require('mongoose')

const Car = mongoose.model('Car', {
  name: String,
  year: Number,
  color: String,
  price: Number,
  ipva: Boolean
})

module.exports = Car