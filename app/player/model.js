const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')

const HASH_ROUND = 10

const playerSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'email harus diisi']
    },
    name:{
        type: String,
        required: [true, 'name harus diisi'],
        maxLength: [225, 'panjang nama harus antara 3 - 225 karakter'],
        minLength: [3, 'panjang nama harus antara 3 - 225 karakter'],
    },
    username:{
        type: String,
        required: [true, 'username harus diisi'],
        maxLength: [225, 'panjang username harus antara 3 - 225 karakter'],
        minLength: [3, 'panjang username harus antara 3 - 225 karakter'],
    },
    password:{
        type: String,
        required: [true, 'kata sandi harus diisi'],
        maxLength: [225, 'panjang password maksimal 225 karakter'],
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    status:{
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    avatar : {
        type: String,
    },
    filename : {
        type: String,
    },
    phoneNumber:{
        type: String,
        required: [true, 'nomor telepon harus diisi'],
        maxLength: [13, 'panjang nama harus antara 9 - 13 karakter'],
        minLength: [9, 'panjang nama harus antara 9 - 13 karakter'],
    },
    favorite:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
   
}, { timestamps: true })

//validate email
playerSchema.path('email').validate(async function(value){
    try {
        const count = await this.model('Player').countDocuments({ email: value })
        return !count
    } catch (err) {
        throw err
    }
}, attr => `${attr.value} sudah terdaftar`)

//untuk req password
playerSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, HASH_ROUND)
    next()
})

module.exports = mongoose.model('Player', playerSchema);