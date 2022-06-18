const {  GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require("graphql");

//Делаем тип graphQl относительно данных нашей бд (примерно монго_схема = графтип)
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
    })
});

module.exports = UserType;