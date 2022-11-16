const mongoose = require('mongoose')

const nominalSchema = new mongoose.Schema({
    coinName:{
        type: String,
        required: [true, 'nama koin harus diisi']
    },
    coinQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Nominal', nominalSchema);