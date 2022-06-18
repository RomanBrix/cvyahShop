const TelegramType =  require("./types/telegramType");
const {  GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString } = require("graphql");
const {users, tg} = require('./likeDB');








//Создаем себе шаблоны запросов которые будем юзать на клиенте 
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        telegram:{
            type: TelegramType,
            args: {phone: {type: GraphQLString}},
            resolve(parent, args) {
                console.log(args)
                //MONGOOSE FUCTIONS FOR FETCH DATA FROM DB => DO STMH => RETURN TO CLIENT
                //ARGS for args
                //parent like this for searched item
                return tg.find(t => t.phone == args.phone)
            }
        }
    }
})



module.exports = new GraphQLSchema({
    query: RootQuery
});