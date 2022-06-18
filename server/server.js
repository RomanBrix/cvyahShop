require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const sendSms = require('./telegram/bot');
const schema = require('./graphql/schema');
const e = require('express');

let passObj = {};


console.log(passObj);

const app = express();
app.use(express.json());

app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.DEVELOP
}))



app.get('/', (req, res)=>{
    res.send('hi')
})

app.post('/bot-log-in', (req,res)=>{
    const { chatId } = req.body;
    sendSms(req.body.chatId, (code)=>{
        if(code){
            passObj[chatId] = {
                code: code,
                clear: setTimeout(()=>{
                    passObj[chatId] = ''
                    console.log('GO CLEAR')
                    console.log(passObj)
                }, 25000)
            };
            console.log(passObj[chatId])
            console.log(chatId)
            res.json(true);
        }else{
            res.json(false);
        }

    })
    
})



app.post('/bot-check-pass', (req, res)=>{
    const { chatId, pass } = req.body;
    console.log(pass, chatId)
    if(passObj[chatId].code === +pass){

        clearTimeout(passObj[chatId].clear);
        passObj[chatId] = '';
        
        res.json(true)
    }else{
        res.json(false);
    }
})

app.listen(process.env.PORT, err=>{
   err ? console.log(err) :
   console.log(`Starting server http://localhost:${process.env.PORT} `);
})


