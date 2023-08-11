const createError = require("http-errors");
const { BlogModel } = require("../../models/blog.model");
const { GraphQLList } = require("graphql")
const { BlogType } = require("../typeDefs/blog.type")
const { CourseType } = require("../typeDefs/course.type");
const { ProductType } = require("../typeDefs/product.type");
const { graphqlVerifyAccessToken } = require("../../http/middlewares/login.middleware");
const { CourseModel } = require("../../models/course.model");
const { ProductModel } = require("../../models/product.model");
const { UserModel } = require("../../models/user.model");
const { AnyType } = require("../typeDefs/public.types");
const { getUserOrderBasket } = require("../../utils/user-basket/getUserOrderBasket");

const getUserBookmarkedBlogsResolver = {
    type: new GraphQLList(BlogType),
    resolve: async(_, args, context) => {
        const { req } = context;
        const user = await graphqlVerifyAccessToken(req);
        const blogs = await BlogModel.find({ bookmarks: user._id }).populate([
            {path: 'author'},
            {path: 'category'},
            {path: 'comments.user'},
            {path: 'comments.answers.user'},
            {path: 'likes'},
            {path: 'dislikes'},
            {path: 'bookmarks'},
        ]).lean({ virtuals: true });
        if(!blogs) throw new createError.BadRequest('Bookmarked blogs not found');
        return blogs
    }
}

const getUserBookmarkedCoursesResolver = {
    type: new GraphQLList(CourseType),
    resolve: async(_, args, context) => {
        const { req } = context;
        const user = await graphqlVerifyAccessToken(req);
        const courses = await CourseModel.find({ bookmarks: user._id }).populate([
            {path: 'teacher'},
            {path: 'category'},
            {path: 'comments.user'},
            {path: 'comments.answers.user'},
            {path: 'likes'},
            {path: 'dislikes'},
            {path: 'bookmarks'},
        ]).lean({ virtuals: true });
        if(!courses) throw new createError.BadRequest('Bookmarked courses not found');
        return courses
    }
}

const getUserBookmarkedProductsResolver = {
    type: new GraphQLList(ProductType),
    resolve: async(_, args, context) => {
        const { req } = context;
        const user = await graphqlVerifyAccessToken(req);
        const products = await ProductModel.find({ bookmarks: user._id }).populate([
            {path: 'supplier'},
            {path: 'category'},
            {path: 'comments.user'},
            {path: 'comments.answers.user'},
            {path: 'likes'},
            {path: 'dislikes'},
            {path: 'bookmarks'},
        ]).lean({virtuals: true});
        if(!products) throw new createError.BadRequest('Bookmarked products not found');
        return products
    }
}

const getUserBasketResolver = {
    type: AnyType,
    resolve: async(_, args, context) => {
        const { req } = context;
        const user = await graphqlVerifyAccessToken(req);
        const userOrderBasket = await getUserOrderBasket(user._id);
        if(!userOrderBasket) throw new createError.NotFound('User Order Basket not found');
        return userOrderBasket
    }
}

module.exports = {
    getUserBookmarkedBlogsResolver,
    getUserBookmarkedCoursesResolver,
    getUserBookmarkedProductsResolver,
    getUserBasketResolver
}