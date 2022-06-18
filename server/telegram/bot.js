const TelegramBot = require('node-telegram-bot-api');
const UserModel = require('../models/User');
const TelegramModel = require('../models/Telegram');


// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, 'Received your message');
// });


bot.onText(/\/hi/,(msg, match)=>{
    const option = {
        "parse_mode": "Markdown",
        "reply_markup": {
            "one_time_keyboard": true,
            "keyboard": [[{
                text: "Send Contact",
                request_contact: true
            }], ["Cancel"]]
        }
    };
    bot.sendMessage(msg.chat.id, "Send Contact!", option).then(() => {
        
        bot.once("contact",(msg)=>{
            // console.log(msg.contact);
            UserModel.findOne({phone: msg.contact.phone_number}, (err, res)=>{
                // console.log(res)
                TelegramModel.findOne({phone: res.phone}, (err, tg)=>{
                    // console.log(tg)
                    if(!tg){
                        //go reg
                        const newTg = new TelegramModel({
                            chatId: msg.chat.id,
                            phone: res.phone
                        });
                        newTg.save((err)=>{
                            if(err) return bot.sendMessage(msg.chat.id,'smth go wrong')

                            bot.sendMessage(msg.chat.id,'Ok, now you tg registred')
                        })
                    }else{
                        bot.sendMessage(msg.chat.id,'You registred! if you`ve some troubles contact admin')
                    }
                })
                if(res){
                    // 
                }else{
                    bot.sendMessage(msg.chat.id,'First you need to register on site')  
                }
            });
            
            
              
        })
    })
})


function sendSms(chatId, cb) {
    const code = generateRandomIntegerInRange(10000,99999);
    bot.sendMessage(chatId, code)
    .then(()=> {
        cb(code)
    })
    
}





function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




module.exports = sendSms;