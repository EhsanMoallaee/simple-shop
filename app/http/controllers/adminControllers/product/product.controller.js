const createError = require("http-errors");
const Controller = require("../../controller");
const { ProductModel } = require("../../../../models/product.model");
const { addProductValidator, updateProductValidator } = require("../../../validators/admin/product/product.validator");
const { deepCopyOfAnObject } = require("../../../../utils/deepCopyOfAnObject");
const { deleteFilesFromPublic } = require("../../../../utils/deleteFilesFromPublic");
const { objectIDValidator } = require("../../../validators/publicValidators/objectID.validator");
const { PRODUCT_TYPES } = require("../../../../utils/constants");
const { productUpdateDataAssignValues } = require("../../../../utils/product/productUpdateDataAssignValues");

class ProductController extends Controller {

    addProduct = async(req, res, next) => {
        const { error } = addProductValidator(req.body);
        if(error) {
            console.log(error);
            deleteFilesFromPublic(req.images);
            return next(createError.BadRequest(error.message));
        }
        let features = {}
        if(req.body.type == PRODUCT_TYPES.REAL_PRODUCT) {
            features = {
                height: req.body.height ? Number(req.body.height) : 0,
                length: req.body.length ? Number(req.body.length) : 0,
                width: req.body.width ? Number(req.body?.width) : 0,
                weigth: req.body.weigth ? Number(req.body.weigth) : 0,
                made_in: req.body.made_in ? req.body.made_in : undefined,
                colors: req.body.colors ? (req.body.colors) : undefined,
            }
        }
        if(!req.images || req?.images.length == 0) return next(createError.BadRequest('Uploading at least one image is required'))
        let image = req?.images ? req.images[0] : null;
        const productData = { ...req.body, image, gallery_images: req?.images, features }
        const product = await ProductModel.create(productData);
        if(!product || !product._id) {
            deleteFilesFromPublic(req.images);
            return next(createError.InternalServerError('Internal server error occured'));
        }
        return res.status(201).json({
            statusCode: 201,
            success: true,
            message: 'Product created successfully',
            data: {
                product
            }
        })
    }

    getAllProducts = async(req, res, next) => {
        const search = req?.query?.search;
        const searchQuery = search ? { $text: { $search: new RegExp(search, 'ig')}} : {};
        const products = await ProductModel.find(searchQuery).lean({ virtuals: true});
        if(!products || products.length == 0) return next(createError.NotFound('Products not found'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            data: {
                products
            }
        })
    }

    getProductById = async(req, res, next) => {
        const { id } = req.params;
        const { error } = objectIDValidator({id: id});
        if(error) {
            console.log(error);
            return next(createError.BadRequest(error.message));
        }
        const product = await ProductModel.findById(id, {__v: 0});
        if(!product) return next(createError.NotFound('Product not found'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            data: {
                product
            }
        })

    }

    updateProduct = async(req, res, next) => {
        const { id } = req.params;
        let { error: objectIDError } = objectIDValidator({id});
        let { error } = updateProductValidator(req.body);
        if(objectIDError || error) {
            console.log(error?.message || objectIDError?.message);
            deleteFilesFromPublic(req.images);
            return next(createError.BadRequest({dataError : error?.message, idError: objectIDError?.message}));
        }
        const product = await ProductModel.findById(id);
        if(!product)  {
            deleteFilesFromPublic(req.images);
            return next(createError.NotFound('Product not found'));
        }
        const data = deepCopyOfAnObject(req.body);
        if(req.files.length > 0) {
            data.image = req?.images ? req.images[0] : product.image;
            data.gallery_images = req?.images ? req.images : (product.gallery_images?? null);
        }
        const updateData = productUpdateDataAssignValues(data, product);
        const updateProduct = await ProductModel.findOneAndUpdate({ _id : id}, updateData, {new: true});
        if(!updateProduct) {
            deleteFilesFromPublic(req.images);
            return next(createError.InternalServerError('Update failed'));
        }
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Product updated successfully',
            data: {
                updateProduct
            }
        })
    }

    removeProduct = async(req, res, next) => {
        const { id } = req.params;
        const { error } = objectIDValidator({id});
        if(error) {
            console.log(error);
            return next(createError.BadRequest(error.message));
        }
        const product = await ProductModel.findById(id);
        if(!product) return next(createError.NotFound('Product not found'));
        // ToDo: Need to develope -> check product state before deleting
        const deleteResult = await ProductModel.findByIdAndDelete(id);
        if(!deleteResult) return next(createError.InternalServerError('Internal server error occured'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Product deleted successfully'
        })
    }
}

module.exports = {
    ProductController: new ProductController(),
}