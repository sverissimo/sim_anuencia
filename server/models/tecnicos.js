const mongoose = require('mongoose');

const tecnicoSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },   
    email: {
        type: String,
        trim: true
    },
    cau: {
        type: String,
        trim: true
    },
    municipios: [],

}, { timestamps: true });

const tecModel = mongoose.model('tecnico', tecnicoSchema);

module.exports = { tecModel }