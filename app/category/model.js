const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'nama kategorui harus diisi']
    }
})

module.exports = mongoose.model('Category', categorySchema);