const mongoose = require('mongoose');

const prefeituras = mongoose.Schema({

    setor: {
        type: "String",
        trim: true
    },
    nome: {
        type: "String",
        trim: true
    },
    cargo: {
        type: "String",
        trim: true
    },
    vocativo1: {
        type: "String",
        trim: true
    },
    vocativo2: {
        type: "String",
        trim: true
    },
    endereco: {
        type: "String",
        trim: true
    },
    cep: {
        type: "String",
        trim: true
    },
    municipio: {
        type: "String",
        trim: true
    },
    email: {
        type: "String",
        trim: true
    },
    telefone1: {
        type: "String",
        trim: true
    },
    contato1: {
        type: "String",
        trim: true
    },
    telefone2: {
        type: "String",
        trim: true
    },
    contato2: {
        type: "String",
        trim: true
    },
}, { timestamps: true })

const prefModel = mongoose.model('Prefeitura', prefeituras)

module.exports = { prefModel }