const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { UserType, CategorySubType } = require("./public.types");

const BlogType = new GraphQLObjectType({
    name: 'BlogType',
    fields: {
        _id: { type: GraphQLString },
        author: { type: UserType },
        title: { type: GraphQLString },
        brief_text: { type: GraphQLString },
        text: { type: GraphQLString },
        image: { type: GraphQLString },
        imageURL: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        category: { type: CategorySubType },
    }
})

module.exports = {
    BlogType
}