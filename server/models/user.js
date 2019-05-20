const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    municipio: {
        type: String,
    },  
    password: {
        type: String,
        required: true,        
    },
    role: {
        type: String,
    },   
    verified: {
        type: Boolean
    },
})

const User = mongoose.model('User', userSchema)

module.exports = { User }