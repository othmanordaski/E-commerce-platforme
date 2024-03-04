const mongoose = require('mongoose')

const User = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age : {
        type: Number,
        required: true
    },
    country : {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
      },
    phoneNumber : {
        type: String,
        required: true,
        unique: true 
    },
    filename : {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', User)