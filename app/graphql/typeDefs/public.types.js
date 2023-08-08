const { GraphQLObjectType, GraphQLString, GraphQLScalarType, GraphQLBoolean } = require("graphql");
const { parseToObject } = require("../utils/parseToObject");
const { parseLiteral } = require("../utils/parseLiterlal");

const AnyType = new GraphQLScalarType({
    name: 'AnyType',
    parseValue: parseToObject,
    serialize: parseToObject,
    parseLiteral: parseLiteral
})

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        _id: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        mobile: { type: GraphQLString },
        email: { type: GraphQLString },
    }
})

const CategorySubType = new GraphQLObjectType({
    name: 'CategorySubType',
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString }
    }
})

const ResponseType = new GraphQLObjectType({
    name: 'ResponseType',
    fields: {
        statusCode: { type: GraphQLString },
        success: { type: GraphQLBoolean},
        message: { type: GraphQLString}
    }
})

module.exports = {
    AnyType,
    UserType,
    CategorySubType,
    ResponseType
}
