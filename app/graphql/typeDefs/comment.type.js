const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList } = require("graphql");
const { UserType, AnyType } = require("./public.types");

const CommentAnswerType = new GraphQLObjectType({
    name: 'CommentAnswerType',
    fields: {
        _id: { type: GraphQLString },
        user: { type: UserType },
        comment: { type: GraphQLString},
        show: { type: GraphQLBoolean},
        createdAt: { type: GraphQLString}
    }
})

const CommentType = new GraphQLObjectType({
    name: 'CommentType',
    fields: {
        _id: { type: GraphQLString },
        user: { type: UserType },
        comment: { type: GraphQLString},
        open_toReply: { type: GraphQLBoolean},
        show: { type: GraphQLBoolean},
        answers: { type: new GraphQLList(CommentAnswerType) },
        createdAt: { type: GraphQLString},
    }
})

module.exports = {
    CommentType
}