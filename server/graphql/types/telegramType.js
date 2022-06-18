const {  GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");
const UserType = require('./userType');
const {users} = require('../likeDB');

//Делаем тип graphQl относительно данных нашей бд (примерно монго_схема = графтип)
const TelegramType = new GraphQLObjectType({
    name: 'telegram',
    fields: ()=>({
        id: {type: GraphQLID},
        telegram_id: {type: GraphQLString},
        phone: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent){
                return users.find(user => user.phone === parent.phone)
            }
        }
    })
});

module.exports = TelegramType;