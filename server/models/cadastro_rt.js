const mongoose = require('mongoose');

const cadastroRtSchema = mongoose.Schema({
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

}, { timestamps: true });

const CadastroRt = mongoose.model('RT', cadastroRtSchema);

module.exports = { CadastroRt }