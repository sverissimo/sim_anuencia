const mongoose = require('mongoose');

const cadastroEmpSchema = mongoose.Schema({
   
    nome: {
        type: String,
        trim: true
    },
    cpf: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    cep: {
        type: String,
        trim: true
    },
    numero: {
        type: String,
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

}, { timestamps: true });

const empreendedor = mongoose.model('Empreendedore', cadastroEmpSchema);

module.exports = { empreendedor }