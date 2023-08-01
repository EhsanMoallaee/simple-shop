const createError = require("http-errors");
const { BlogModel } = require("../../../../models/blog.model");
const Controller = require("../../controller");
const { addBlogValidator, updateBlogValidator } = require("../../../validators/admin/blog/blog.validator");
const { deepCopyOfAnObject } = require("../../../../utils/deepCopyOfAnObject");
const { deleteFilesFromPublic } = require("../../../../utils/deleteFilesFromPublic");
const { deleteNullsFromObjects } = require("../../../../utils/deleteNullsFromObject");

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
            },
            {
                $addFields: { 
                    imageURL:
                        { $concat: [ process.env.BASE_URL, process.env.PORT, "$image" ] } 
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
        const { id } = req.params;
        const author = req.user._id;
        const { error } = updateBlogValidator(req.body);
        if(error) {
            console.log(error);
            deleteFilesFromPublic(req.images);
            return next(createError.BadRequest(error.message));
        }
        let data = deepCopyOfAnObject(req.body)
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
            return next(createError.InternalServerError('Internal server error occured'));
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