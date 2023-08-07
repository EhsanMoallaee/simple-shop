const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { ProductResolver } = require("./queries/product.resolver");
const { CategoryResolver, CategoryChildrenResolver } = require("./queries/category.resolver");
const { CourseResolver } = require("./queries/course.resolver");
const { CreateCommentForBlogResolver } = require("./queries/comment.resolver");

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        blogs: BlogResolver,
        products: ProductResolver,
        categories: CategoryResolver,
        categoryChildren: CategoryChildrenResolver,
        courses: CourseResolver,
    }
})

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        CreateCommentForBlogResolver
    }
})

const appGraphqlSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})

module.exports = {
    appGraphqlSchema
}