const mongoose = require('mongoose');

const cadastroSchema = mongoose.Schema({
    nome: {
        type: String,
        trim: true
    },
    cpf: {
        type: Number,
        trim: true
    },
    birth: {
        type: Date,
        trim: true
    },
    phone: {
        type: Number,
        trim: true
    },
    cep: {
        type: Number,
        trim: true
    },
    numero: {
        type: Number,
        trim: true
    },
    complemento: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    rua: {
        type: String,
        trim: true
    },
    bairro: {
        type: String,
        trim: true
    },
    cidade: {
        type: String,
        trim: true
    },
    uf: {
        type: String,
        trim: true
    },
    nomeRt: {
        type: String,
        trim: true
    },
    emailRt: {
        type: String,
        trim: true
    },
    phoneRt: {
        type: String,
        trim: true
    },

}, {timestamps: true} );

const Cadastro = mongoose.model('Cadastro', cadastroSchema);

module.exports = { Cadastro }