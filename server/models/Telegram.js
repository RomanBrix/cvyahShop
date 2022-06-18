const mongoose = require('mongoose');


const TelegramSchema = new mongoose.Schema({
    chatId:{
        type: String,
        default: ''
    },
    phone:{
        type: String
    }
})


module.exports = mongoose.model( 'Telegram', TelegramSchema );