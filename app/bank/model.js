const mongoose = require('mongoose')

const bankSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'nama harus diisi']
    },
    bankName:{
        type: String,
        required: [true, 'nama bank harus diisi']
    },
    noRekening: {
        type: Number,
        required: [true, 'nomor rekening  harus diisi']
    }
}, { timestamps: true })

module.exports = mongoose.model('Bank', bankSchema);