const mongoose = require('mongoose')

const User = mongoose.model('User', {
    cpf: Number,
    name: String,
    age: Number,
    email: String
})

module.exports = User