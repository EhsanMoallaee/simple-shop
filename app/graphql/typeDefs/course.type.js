const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { UserType, CategorySubType } = require("./public.types");

const EpisodedType = new GraphQLObjectType({
    name: 'EpisodedType',
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        type: { type: GraphQLString },
        time: { type: GraphQLString },
        video: { type: GraphQLString },
        videoURL: { type: GraphQLString },
    }
})

const ChaptersType = new GraphQLObjectType({
    name: 'ChaptersType',
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        episodes: { type: new GraphQLList(EpisodedType) }
    }
})

const CourseType = new GraphQLObjectType({
    name: 'CourseType',
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        brief_text: { type: GraphQLString },
        text: { type: GraphQLString },
        price: { type: GraphQLInt },
        discount: { type: GraphQLInt },
        type: { type: GraphQLString },
        status: { type: GraphQLString },
        teacher: { type: UserType },
        totalTime: { type: GraphQLString },
        imageURL: { type: GraphQLString },
        category: { type: CategorySubType },
        tags: { type: new GraphQLList(GraphQLString) },
        chapters: { type: new GraphQLList(ChaptersType) }
    }
})

module.exports = {
    CourseType
}