const createError = require("http-errors");
const { UserModel } = require("../../models/user.model");
const { GraphQLString, GraphQLInt } = require("graphql");
const { ResponseType } = require("../typeDefs/public.types");

const { graphqlVerifyAccessToken } = require("../../http/middlewares/login.middleware");
const { validateObjectId } = require("../utils/validateItemId");
const { findProductInUserBasket } = require("./functions/findProductInUserBasket");
const { findCourseInUserBasket } = require("./functions/findCourseInUserBasket");
const { checkExistProduct } = require("../utils/checkExistProduct");
const { checkExistCourse } = require("../utils/checkExistCourse");

const AddProductToBasket = {
    type: ResponseType,
    args: {
        productId: { type: GraphQLString }
    },
    resolve: async(_, args, context) => {
        const { productId } = args;
        const { req } = context;
        const user = await graphqlVerifyAccessToken(req);
        validateObjectId(productId);
        const existProduct = await checkExistProduct(productId);
        if(!existProduct) throw new createError.NotFound('Product not found');
        const product = await findProductInUserBasket(user._id, productId);
        let message;
        if(product) {
            const searchQuery = {
                _id: user._id,
                'basket.products.productId': productId
            }
            const updateQuery = {
                $inc: { 'basket.products.$.count': 1 }
            }
            await UserModel.findOneAndUpdate(searchQuery, updateQuery);
            message = 'Product\'s count in your basket incremented by 1 successfully';
        } else {
            const searchQuery = {
                _id: user._id
            }
            const updateQuery = {
                $push:{
                    'basket.products': { 
                        productId,
                        count: 1
                    }
                }
            }
            await UserModel.findOneAndUpdate(searchQuery, updateQuery);
            message = 'Product added to your basket successfully';
        }
        return {
            statusCode: message ? 200 : 500,
            success: true,
            message: message || 'Server internal error occured'
        }
    }
}

const AddCourseToBasket = {
    type: ResponseType,
    args: {
        courseId: { type: GraphQLString},
        count: { type: GraphQLInt},
    },
    resolve: async(_, args, context) => {
        const { courseId } = args;
        const { req } = context;
        const user = await graphqlVerifyAccessToken(req);
        validateObjectId(courseId);
        const existCourse = await checkExistCourse(courseId);
        if(!existCourse) throw new createError.NotFound('Course not found');
        const course = await findCourseInUserBasket(user._id, courseId);
        let message;
        if(course) {
            const searchQuery = {
                _id: user._id,
                'basket.courses.courseId': courseId
            }
            const updateQuery = {
                $inc: { 'basket.courses.$.count': 1 }
            }
            await UserModel.findOneAndUpdate(searchQuery, updateQuery);
            message = 'Course\'s count in your basket incremented by 1 successfully';
        } else {
            const searchQuery = {
                _id: user._id
            }
            const updateQuery = {
                $push:{
                    'basket.courses': { 
                        courseId,
                        count: 1
                    }
                }
            }
            await UserModel.findOneAndUpdate(searchQuery, updateQuery);
            message = 'Product added to your basket successfully';
        }
        return {
            statusCode: message ? 200 : 500,
            success: true,
            message: message || 'Server internal error occured'
        }
    }
}

const RemoveProductFromBasket = {
    type: ResponseType,
    args: {
        productId: { type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const { productId, count} = args;
        const { req } = context;
        const user = await graphqlVerifyAccessToken(req);
        validateObjectId(productId);
        const existProduct = await checkExistProduct(productId);
        if(!existProduct) throw new createError.NotFound('Product not found');
        const product = await findProductInUserBasket(user._id, productId);
        if(!product) throw new createError.NotFound('Product not found in your basket');
        let message;
        if(product.count > 1) {
            const searchQuery = {
                _id: user._id,
                'basket.products.productId': productId
            }
            const updateQuery = {
                $inc: { 'basket.products.$.count': -1 }
            }
            await UserModel.findOneAndUpdate(searchQuery, updateQuery);
            message = 'Product\'s count in your basket decremented by 1 successfully';
        } else {
            const searchQuery = {
                _id: user._id,
                'basket.products.productId': productId
            }
            const updateQuery = {
                $pull: {
                    'basket.products': { 
                        productId
                    }
                }
            }
            await UserModel.findOneAndUpdate(searchQuery, updateQuery);
            message = 'Product removed from your basket successfully';
        }
        return {
            statusCode: message ? 200 : 500,
            success: true,
            message: message || 'Server internal error occured'
        }
    }
}

const RemoveCourseFromBasket = {
    type: ResponseType,
    args: {
        courseId: { type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const { courseId, count } = args;
        const { req } = context;
        const user = await graphqlVerifyAccessToken(req);
        validateObjectId(courseId);
        const existCourse = await checkExistCourse(courseId);
        if(!existCourse) throw new createError.NotFound('Course not found');
        const course = await findCourseInUserBasket(user._id, courseId);
        if(!course) throw new createError.NotFound('Course not found in your basket');
        let message;
        if(course.count > 1) {
            const searchQuery = {
                _id: user._id,
                'basket.courses.courseId': courseId
            }
            const updateQuery = {
                $inc: { 'basket.courses.$.count': -1 }
            }
            await UserModel.findOneAndUpdate(searchQuery, updateQuery);
            message = 'Course\'s count in your basket decremented by 1 successfully';
        } else {
            const searchQuery = {
                _id: user._id,
                'basket.courses.courseId': courseId
            }
            const updateQuery = {
                $pull:{
                    'basket.courses': { 
                        courseId
                    }
                }
            }
            await UserModel.findOneAndUpdate(searchQuery, updateQuery);
            message = 'Course removed from your basket successfully';
        }
        return {
            statusCode: message ? 200 : 500,
            success: true,
            message: message || 'Server internal error occured'
        }
    }
}

module.exports = {
    AddCourseToBasket,
    AddProductToBasket,
    RemoveCourseFromBasket,
    RemoveProductFromBasket
}