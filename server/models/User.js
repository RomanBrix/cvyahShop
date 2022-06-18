const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    mail:{
        type: String,
        default: ''
    },
    phone:{
        type: String,
        ref: 'Telegram'
    },
    address:{
        type: String,
        default: ''
    },
    orders_id:{
        type: mongoose.Schema.Types.Array,
        default: []
    },
    salt:{
        type: String,
        default: ''
    },
    role:{
        type: String,
        default: 'buyer'
    }
})


module.exports = mongoose.model( 'User', UserSchema );