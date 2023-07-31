const createError = require("http-errors");
const { BlogModel } = require("../../../../models/blog.model");
const { addBlogValidator } = require("../../../validators/admin/blog/blog.validator");
const Controller = require("../../controller");
const { deleteFilesFromPublic } = require("../../../../utils/deleteFilesFromPublic");

class BlogController extends Controller {

    addBlog = async(req, res, next) => {
        const { error } = addBlogValidator(req.body);
        if(error) {
            deleteFilesFromPublic(req.images);
            return next(createError.BadRequest(error.message));
        }
        const author = req.user._id;
        const blogData = { ...req.body, image: req.image, author }
        const blog = await BlogModel.create(blogData);
        if(!blog) {
            deleteFilesFromPublic(req.images);
            return next(createError.InternalServerError('Internal server error occured'));
        }
        return res.status(201).json({
            statusCode: 201,
            success: true,
            message: 'Blog created successfully',
            data: {
                blog
            }
        })
    }

    getBlogById = async(req, res, next) => {
        const { id } = req.params;
        const blog = await BlogModel.findOne({_id: id}, { autoPopulate: false })
            .populate([
                {path: 'category', select: {'title': 1}},
                {path: 'author', select: {'username': 1, 'mobile': 1, '_id': 0}}]
            );
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
        const blogs = await BlogModel.aggregate([
            { $match: {} },
            {
                $lookup: {
                    from: 'users',
                    foreignField: '_id',
                    localField: 'author',
                    as: 'author'
                }
            },
            {
                $unwind: '$author'
            },
            {
                $lookup: {
                    from: 'categories',
                    foreignField: '_id',
                    localField: 'category',
                    as: 'category'
                }
            },
            {
                $unwind: '$category'
            },
            {
                $project: {
                    'author.otp': 0,
                    'author.discount_code': 0,
                    'author.roles': 0,
                    'author.bills': 0,
                    'author.__v': 0,
                    'category.__v': 0,
                }
            }
        ]);
        if(!blogs || blogs.length == 0) return next(createError.NotFound('Blog not found'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            data: {
                blogs
            }
        });
    }

    getCommentsOfBlog = async(req, res, next) => {}

    deleteBlogById = async(req, res, next) => {
        const { id } = req.params;
        const result = await BlogModel.findByIdAndDelete(id);
        if(!result) return next(createError.NotFound('Blog not found'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Blog deleted successfully'
        })
    }

    updateBlogById = async(req, res, next) => {
        const { error } = addBlogValidator(req.body);
        if(error) {
            deleteFilesFromPublic(req.images);
            return next(createError.BadRequest(error.message));
        }
        const { id } = req.params;
        const author = req.user._id;
        const blog = await BlogModel.findById(id);
        if(!blog) return next(createError.NotFound('Blog not found'));
        if(!blog.author.equals(author)) {
            deleteFilesFromPublic(req.images);
            return next(createError.Forbidden('You cant update other author\'s blog'));
        }
        let data = req.body;
        let nullishData = ['', ' ', null, undefined, 0, '0'];
        let blackListData = ['author', 'likes', 'dislikes', 'bookmarks', 'comments'];
        Object.keys(data).forEach(key => {
            if(blackListData.includes(data[key])) {
                delete data[key]
            }
            if(typeof data[key] === "string") {
                data[key] = data[key].trim();
            }
            if(Array.isArray(data[key]) && data[key].length > 0) {
                data[key] = data[key].map(val => val.trim());
            }
            if(nullishData.includes(data[key])) {
                delete data[key]
            }
        })
        if(req?.image) {
            data = { ...req.body, image: req?.image }
        }
        const updatedBlog = await BlogModel.findByIdAndUpdate(id, {$set: data}, { new: true }).select({__v: 0});
        if(!updatedBlog) {
            deleteFilesFromPublic(req.images);
            return next(createError.InternalServerError('Internal server error occured'));
        }
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Blog updated successfully',
            data: {
                updatedBlog
            }
        })
    }

}

module.exports = {
    BlogController: new BlogController(),
}