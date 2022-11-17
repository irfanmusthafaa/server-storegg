const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'email harus diisi']
    },
    name:{
        type: String,
        required: [true, 'name harus diisi']
    },
    password:{
        type: String,
        required: [true, 'kata sandi harus diisi']
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'admimn'
    },
    status:{
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    phoneNumber:{
        type: String,
        required: [true, 'nomor telepon harus diisi']
    },
   
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);