const createError = require("http-errors");
const { ProductModel } = require("../../../models/product.model");
const { addProductValidator } = require("../../validators/admin/product/product.validator");
const Controller = require("../controller");
const { deleteFileFromPublic } = require("../../../utils/deleteFileFromPublic");
const { PRODUCT_TYPES } = require("../../../utils/constants");

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
                weigth: req.body.weigth ? Number(req.body.weigth) : 0
            }
        }
        const productData = { ...req.body, image: req.image, features }
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
        const products = await ProductModel.find();
        if(!products) {
            return next(createError.NotFound('Product not found'));
        }
        return res.status(200).json({
            statusCode: 201,
            success: true,
            message: 'Product found successfully',
            data: {
                products
            }
        })
    }

    updateProduct = async(req, res, next) => {}
    removeProduct = async(req, res, next) => {}
    getProductById = async(req, res, next) => {}
}

module.exports = {
    ProductController: new ProductController(),
}