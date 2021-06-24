const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    cart: {
        type: Array,
        default: []
    },
    img:{
        type:String,
        default:'https://scontent.fhan3-2.fna.fbcdn.net/v/t1.30497-1/c59.0.200.200a/p200x200/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&ccb=1-3&_nc_sid=7206a8&_nc_ohc=pwgVwHA3QRAAX_NUhD7&_nc_ht=scontent.fhan3-2.fna&tp=27&oh=c819a1ebd4ac0f7547d55261b41945e8&oe=60D606C4'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)