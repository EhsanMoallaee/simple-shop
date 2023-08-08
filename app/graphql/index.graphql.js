const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { ProductResolver } = require("./queries/product.resolver");
const { CategoryResolver, CategoryChildrenResolver } = require("./queries/category.resolver");
const { CourseResolver } = require("./queries/course.resolver");
const { CreateCommentForBlogResolver, CreateCommentForProductResolver, CreateCommentForCourseResolver } = require("./mutations/comment.resolver");
const { LikeAndDislikeProductResolver, LikeAndDislikeCourseResolver, LikeAndDislikeBlogResolver } = require("./mutations/likeAndDislike.resolver");
const { BookmarkProductResolver, BookmarkCourseResolver, BookmarkBlogResolver } = require("./mutations/bookmark.resolver");
const { getUserBookmarkedBlogsResolver, getUserBookmarkedCoursesResolver, getUserBookmarkedProductsResolver } = require("./queries/user-profile.resolver");

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        blogs: BlogResolver,
        products: ProductResolver,
        categories: CategoryResolver,
        categoryChildren: CategoryChildrenResolver,
        courses: CourseResolver,
        getUserBookmarkedBlogsResolver,
        getUserBookmarkedCoursesResolver,
        getUserBookmarkedProductsResolver
    }
})

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        CreateCommentForBlogResolver,
        CreateCommentForCourseResolver,
        CreateCommentForProductResolver,
        LikeAndDislikeBlogResolver,
        LikeAndDislikeCourseResolver,
        LikeAndDislikeProductResolver,
        BookmarkBlogResolver,
        BookmarkCourseResolver,
        BookmarkProductResolver,
    }
})

const appGraphqlSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})

module.exports = {
    appGraphqlSchema
}