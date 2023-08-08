const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { UserType, CategorySubType } = require("./public.types");
const { CommentType } = require("./comment.type");


const FeaturesType = new GraphQLObjectType({
    name: 'FeaturesType',
    fields: {
        length: { type: GraphQLString },
        height: { type: GraphQLString },
        width: { type: GraphQLString },
        weight: { type: GraphQLString },
        made_in: { type: GraphQLString },
        colors: { type: new GraphQLList(GraphQLString) }
    }
})

const ProductType = new GraphQLObjectType({
    name: 'ProductType',
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        brief_text: { type: GraphQLString },
        text: { type: GraphQLString },
        category: { type: CategorySubType },
        price: { type: GraphQLInt },
        discount: { type: GraphQLInt },
        count: { type: GraphQLInt },
        type: { type: GraphQLString },
        supplier: { type: UserType },
        imageURLs: { type: new GraphQLList(GraphQLString) },
        tags: { type: new GraphQLList(GraphQLString) },
        features: { type: FeaturesType },
        comments: { type: new GraphQLList(CommentType)},
    }
})

module.exports = {
    ProductType
}