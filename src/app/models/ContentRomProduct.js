const mongoose = require('mongoose')


const ContentRomProduct = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }
    ,
    content:{
        type:Array,
        default:[]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("ContentRomProduct", ContentRomProduct)