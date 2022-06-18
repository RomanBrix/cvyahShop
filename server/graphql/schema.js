const {  GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLList } = require("graphql");
// const UserType = require("./types/userType");
// const TelegramType =  require("./types/telegramType");
const User = require('../models/User'); 
const Telegram = require('../models/Telegram'); 


const TelegramType = new GraphQLObjectType({
    name: 'telegram',
    fields: ()=>({
        id: {type: GraphQLID},
        chatId: {type: GraphQLString},
        phone: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent){
                
                return User.findOne({phone: parent.phone})
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'user',
    fields: ()=>({
        id: {type: GraphQLID},
        mail: {type: GraphQLString},
        phone: {type: GraphQLString},
        name: {type: GraphQLString},
        address: {type: GraphQLString},
        orders_id: {type: GraphQLString},
        role: {type: GraphQLString},
        salt: {type: GraphQLString},

        telega: {
            type: TelegramType,
            resolve(parent){
                
                return Telegram.findOne({phone: parent.phone})
            }
        }
    })
});



//Создаем себе шаблоны запросов которые будем юзать на клиенте 
///// GET
//
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

        //TELEGRAMS
        telegramByNumber:{
            type: TelegramType,
            args: {phone: {type: GraphQLString}},
            resolve(parent, args) {
                console.log(args.phone)
                //MONGOOSE FUCTIONS FOR FETCH DATA FROM DB => DO STMH => RETURN TO CLIENT
                //ARGS for args
                //parent like `this` for searched item
                return Telegram.findOne({phone: args.phone});
            }
        },
        allTelegrams:{
            type: new GraphQLList(TelegramType),
            resolve(parent, args) {
                console.log(args)
                return Telegram.find();
            }
        },


        //USERS
        userByPhone:{
            type: UserType,
            args: {phone: {type: GraphQLString}},
            resolve(parent, args) {
                console.log(args.phone)
                //MONGOOSE FUCTIONS FOR FETCH DATA FROM DB => DO STMH => RETURN TO CLIENT
                //ARGS for args
                //parent like `this` for searched item
                return User.findOne({phone: args.phone});
            }
        },
        allUsers:{
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                console.log(args)
                return User.find();
            }
        },
    }
})




//POST UPDATE
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                phone: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: new GraphQLNonNull(GraphQLString)},
                role: {type: GraphQLString},
            },
            resolve(par, args){
                const user = new User({
                    name: args.name,
                    phone: args.phone,
                    role: args.role,
                })
                // console.log(user.save)
                return user.save();
            }
        },
        addTelegram: {
            type: TelegramType,
            args: {
                phone: {type: new GraphQLNonNull(GraphQLString)},
                chatId: {type: GraphQLString},
            },
            resolve(par, args){
                const telega = new Telegram({
                    chatId: args.chatId,
                    phone: args.phone,
                })
                // console.log(user.save)
                return telega.save();
            }
        }
        
    }
})



module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});