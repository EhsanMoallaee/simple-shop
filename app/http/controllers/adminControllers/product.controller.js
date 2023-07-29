const createError = require("http-errors");
const { ProductModel } = require("../../../models/product.model");
const { addProductValidator } = require("../../validators/admin/product/product.validator");
const Controller = require("../controller");
const { deleteFileFromPublic } = require("../../../utils/deleteFileFromPublic");
const { PRODUCT_TYPES } = require("../../../utils/constants");
const { objectIDValidator } = require("../../validators/publicValidators/objectID.validator");

class ProductController extends Controller {

    addProduct = async(req, res, next) => {
        const { error } = addProductValidator(req.body);
        if(error) {
            console.log(error);
            deleteFileFromPublic(req.image);
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
        req.image = req?.images ? req.images[0] : null;
        const productData = { ...req.body, image: req?.image, gallery_images: req?.images, features }
        const product = await ProductModel.create(productData);
        if(!product) {
            deleteFileFromPublic(req.image);
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
        const query = {
            $text: { $search: new RegExp(search, 'ig') }
        }
        const searchQuery = search ? query : {};
        const products = await ProductModel.find(searchQuery).lean();
        if(!products || products.length == 0) {
            return next(createError.NotFound('Product not found'));
        }
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Product found successfully',
            data: {
                products
            }
        })
    }

    getProductById = async(req, res, next) => {
        const { productId } = req.params;
        const { error } = objectIDValidator({id: productId});
        if(error) {
            console.log(error);
            return next(createError.BadRequest(error.message));
        }
        const product = await ProductModel.findById(productId, {__v: 0});
        if(!product) return next(createError.NotFound('Product not found'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Product found successfully',
            data: {
                product
            }
        })

    }

    updateProduct = async(req, res, next) => {}

    removeProduct = async(req, res, next) => {
        const { id } = req.params;
        const product = await ProductModel.findById(id);
        if(!product) return next(createError.NotFound('Product not found'));
        // Need to develope -> check product state
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