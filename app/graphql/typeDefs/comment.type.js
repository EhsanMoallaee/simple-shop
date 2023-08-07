const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require("graphql");
const { UserType, AnyType } = require("./public.types");

const CommentParentType = new GraphQLObjectType({
    name: 'CommentParentType',
    fields: {
        user: { type: UserType },
        comment: { type: GraphQLString}
    }
})

const CommentType = new GraphQLObjectType({
    name: 'CommentType',
    fields: {
        user: { type: UserType },
        comment: { type: GraphQLString},
        open_toReply: { type: GraphQLBoolean},
        show: { type: GraphQLBoolean},
        parent: { type: CommentParentType },
    }
})

module.exports = {
    CommentType
}