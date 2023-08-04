const { Router } = require('express');
const { ProductController } = require('../../http/controllers/adminControllers/product/product.controller');
const { imageUploader } = require('../../utils/multer/image.uploader');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const { PERMISSIONS } = require('../../utils/constants');
const { checkPermission } = require('../../http/middlewares/permission.guard');
const adminProductRouter = Router();

adminProductRouter.get('/list', ProductController.getAllProducts);
adminProductRouter.get('/:id', ProductController.getProductById);
adminProductRouter.post(
    '/add',
    [checkPermission([PERMISSIONS.PRODUCT.CREATE]), imageUploader.array('gallery_images', 10), stringToArray('tags', 'colors')],
    ProductController.addProduct
);
adminProductRouter.delete(
    '/remove/:id',
    checkPermission([PERMISSIONS.PRODUCT.DELETE]),
    ProductController.removeProduct
);
adminProductRouter.patch(
    '/update/:id',
    [checkPermission([PERMISSIONS.PRODUCT.UPDATE]),imageUploader.array('gallery_images', 10), stringToArray('tags', 'colors')],
    ProductController.updateProduct
);

module.exports = {
    adminProductRouter,
}