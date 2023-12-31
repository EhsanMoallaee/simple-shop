const createError = require("http-errors");
const { BlogModel } = require("../../../../models/blog.model");
const Controller = require("../../controller");
const { addBlogValidator, updateBlogValidator } = require("../../../validators/admin/blog/blog.validator");
const { deepCopyOfAnObject } = require("../../../../utils/deepCopyOfAnObject");
const { deleteFilesFromPublic } = require("../../../../utils/deleteFilesFromPublic");
const { deleteNullsFromObjects } = require("../../../../utils/deleteNullsFromObject");
const { objectIDValidator } = require("../../../validators/publicValidators/objectID.validator");

class BlogController extends Controller {

    addBlog = async(req, res, next) => {
        const { error } = addBlogValidator(req.body);
        if(error) {
            deleteFilesFromPublic(req.images);
            return next(createError.BadRequest(error.message));
        }
        const author = req.user._id;
        const blogData = { ...req.body, image: req.images[0], author };
        const blog = await BlogModel.create(blogData);
        if(!blog) {
            deleteFilesFromPublic(req.images);
            return next(createError.InternalServerError('Internal server error occured'));
        }
        return res.status(201).json({
            statusCode: 201,
            success: true,
            message: 'Blog created successfully'
        })
    }

    getBlogById = async(req, res, next) => {
        const { id } = req.params;
        const { error } = objectIDValidator({id: id});
        if(error) {
            return next(createError.BadRequest({idError: error.message}));
        }
        const blog = await BlogModel.findOne({_id: id}).populate([
            {path: 'category', select: {'title': 1}},
            {path: 'author', select: {'username': 1, 'mobile': 1, '_id': 0}},
            {path: 'dislikes.userId', select: {'first_name': 1, 'mobile': 1, '_id': 0}},
        ]).lean({ virtuals: true });
        if(!blog) return next(createError.NotFound('Blog not found'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            data: {
                blog
            }
        })
    }

    getAllBlogs = async(req, res, next) => {
        const blogs = await BlogModel.find().populate([
            {path: 'author', select: {first_name: 1, last_name: 1, username: 1, email: 1, _id: 0}},
            {path: 'category', select: {title: 1}},
            {path: 'comments.user', select: {first_name: 1, last_name: 1, username: 1, email: 1, _id: 0}},
            {path: 'comments.answers.user', select: {first_name: 1, last_name: 1, username: 1, email: 1, _id: 0}},
            {path: 'likes.userId', select: {first_name: 1, last_name: 1, username: 1, email: 1, _id: 0}},
            {path: 'dislikes.userId', select: {first_name: 1, last_name: 1, username: 1, email: 1, _id: 0}},
        ]).lean({virtuals: true})
        if(!blogs || blogs.length == 0) return next(createError.NotFound('Blog not found'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            data: {
                blogs
            }
        });
    }

    deleteBlogById = async(req, res, next) => {
        const { id } = req.params;
        const { error } = objectIDValidator({id});
        if(error) {
            return next(createError.BadRequest({idError: error.message}));
        }
        const result = await BlogModel.findByIdAndDelete(id);
        if(!result) return next(createError.NotFound('Blog not found'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Blog deleted successfully'
        })
    }

    updateBlogById = async(req, res, next) => {
        const { id } = req.params;
        const author = req.user._id;
        const { error: objectIDError } = objectIDValidator({id});
        const { error } = updateBlogValidator(req.body);
        if(objectIDError || error) {
            deleteFilesFromPublic(req.images);
            return next(createError.BadRequest({dataError : error?.message, idError: objectIDError?.message}));
        }
        let data = deepCopyOfAnObject(req.body);
        let blackListFields = ['_id', 'author', 'likes', 'dislikes', 'bookmarks', 'comments'];
        deleteNullsFromObjects(data, blackListFields);

        const blog = await BlogModel.findById(id);
        if(!blog) return next(createError.NotFound('Blog not found'));
        if(!blog.author.equals(author)) {
            deleteFilesFromPublic(req.images);
            return next(createError.Forbidden('You cant update other author\'s blog'));
        }
        if(req?.images && req?.images?.length > 0) {
            data = { ...data, image: req.images[0] }
        }
        const updatedBlog = await BlogModel.findByIdAndUpdate(id, {$set: data}, { new: true }).select({__v: 0});
        if(!updatedBlog) {
            deleteFilesFromPublic(req.images);
            return next(createError.InternalServerError('Update failed'));
        }
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Blog updated successfully'
        })
    }
    // ToDo: After comment routes and controller done
    getCommentsOfBlog = async(req, res, next) => {}

}

module.exports = {
    BlogController: new BlogController(),
}