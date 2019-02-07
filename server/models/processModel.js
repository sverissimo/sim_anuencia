const mongoose = require('mongoose');

const processSchema = mongoose.Schema({

    nProcess: {
        type: String,
        trim: true
    },
    nomeEmpreendimento: {
        type: String,
        trim: true
    },
    modalidade: {
        type: String,
        trim: true
    },
    area: {
        type: String,
        trim: true
    },
    munEmpreendimento: {
        type: String,
        trim: true
    },    
    status: {
        type: String,
        trim: true
    },
    tecnico: {
        type: String,
        trim: true
    },
    cgt: {
        type: {},
        trim: true
    },
    vistoria: {
        type: String,
        trim: true
    },
    daeDir: {
        type: String,
        trim: true
    },
    daeAnuencia: {
        type: String,
        trim: true
    },
    empId: {
        type: String,
        trim: true
    },
    rtId: {
        type: String,
        trim: true
    },     
    processHistory: [],

}, { timestamps: true });

const processModel = mongoose.model('Processo', processSchema);

module.exports = { processModel }