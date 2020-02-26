const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: false
    },
    lastName: {
        type: String,
        required: true,
        unique: false
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: false
    },
    picture: {
        type: String,
        required: true,
        unique: false
    },
    register_date: {
        type: Date,
        default:Date.now
        
    },
   
})


module.exports = mongoose.model('user', userSchema)