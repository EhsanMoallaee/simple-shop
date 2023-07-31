const createError = require("http-errors");
const { CategoryModel } = require("../../../models/category.model");
const Controller = require("../controller");
const { addCategoryValidator, updateCategoryValidator } = require("../../validators/admin/category/category.validator");
const mongoose = require('mongoose');

class CategoryController extends Controller {

    addCategory = async(req, res, next) => {
        const { error } = addCategoryValidator(req.body);
        if(error) {
            return next(createError.BadRequest(error.message));
        }
        const { title, parent } = req.body;
        const category = await CategoryModel.create({ title, parent });
        if(!category) return next(createError.InternalServerError('Internal server error occured'));
        return res.status(201).json({
            statusCode: 201,
            success: true,
            message: 'Category added successfully',
            data: {
            }
        })
    }

    removeCategory = async(req, res, next) => {
        const {id} = req.params;
        const result = await CategoryModel.deleteMany({$or: [{ _id: id }, { parent: id }]});
        if(!result || result.deletedCount == 0) return next(createError.NotFound('Category not found'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Category deleted successfully'
        })
    }

    updateCategory = async(req, res, next) => {
        const { id } = req.params;
        const { title } = req.body;
        const { error } = updateCategoryValidator({title, id: id});
        if(error) {
            return next(createError.BadRequest(error.message));
        }
        const updateResult = await CategoryModel.findByIdAndUpdate({_id: id}, { $set: {title} }, { new: true }).select({__v: 0});
        if(!updateResult) return next(createError.NotFound('Category not found'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Category updated successfully',
            data: {
                updateResult
            }
        })
    }

    getAllCategories = async(req, res, next) => {
        // const allCategories = await CategoryModel.aggregate([
        //     {
        //         $graphLookup: {
        //             from: 'categories',
        //             startWith: '$_id',
        //             connectFromField: '_id',
        //             connectToField: 'parent',
        //             maxDepth: 5,
        //             depthField: 'depth',
        //             as: 'children'
        //         },
        //     },
        //     {
        //         $project: {
        //             '__v': 0,
        //             'children.__v': 0,
        //             'children.parent': 0
        //         }
        //     },
        //     {
        //         $match: {
        //             parent: undefined
        //         }
        //     }
        // ]);

        const allCategories = await CategoryModel.find({ parent: undefined }, { __v: 0});
        if(!allCategories || allCategories.length == 0) return next(createError.NotFound('Category not found'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            data: {
                allCategories
            }
        })
    }

    getAllCategoriesWithoutPopulate = async(req, res, next) => {
        const allCategories = await CategoryModel.aggregate([
            { 
                $match: {}
            },
            {
                $project: {
                    __v: 0
                }
            }
        ]);
        if(!allCategories || allCategories.length == 0) return next(createError.NotFound('Category not found'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            data: {
                allCategories
            }
        })
    }

    getAllRootCategories = async(req, res, next) => {
        const rootCategories = await CategoryModel.find({ parent: undefined }, {__v: 0});
        if(!rootCategories || rootCategories.length == 0) return next(createError.NotFound('Category not found'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            data: {
                rootCategories
            }
        })
    }

    getCategoryById = async(req, res, next) => {
        const { id } = req.params;
        const category = await CategoryModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: '_id',
                    foreignField: 'parent',
                    as: 'children'
                }
            },
            {
                $project: {
                    __v: 0,
                    'children.__v': 0,
                    'children.parent': 0
                }
            }
        ]);
        if(!category || category.length == 0) return next(createError.NotFound('Category not found'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            data: {
                category
            }
        })
    }

    getChildrenOfCategory = async(req, res, next) => {
        const { id } = req.params;
        const children = await CategoryModel.find({ id }, {__v: 0, parent: 0});
        if(!children || children.length == 0) return next(createError.NotFound('Category not found'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            data: {
                children
            }
        })
    }
}

module.exports = {
    CategoryController: new CategoryController()
}