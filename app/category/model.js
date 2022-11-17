const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'nama kategorui harus diisi']
    }
}, { timestamps: true })

module.exports = mongoose.model('Category', categorySchema);