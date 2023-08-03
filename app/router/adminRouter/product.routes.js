const { Router } = require('express');
const { ProductController } = require('../../http/controllers/adminControllers/product/product.controller');
const { imageUploader } = require('../../utils/multer/image.uploader');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const adminProductRouter = Router();

adminProductRouter.post('/add', [imageUploader.array('gallery_images', 10), stringToArray('tags', 'colors')], ProductController.addProduct);
adminProductRouter.get('/list', ProductController.getAllProducts);
adminProductRouter.get('/:id', ProductController.getProductById);
adminProductRouter.delete('/remove/:id', ProductController.removeProduct);
adminProductRouter.patch('/update/:id', [imageUploader.array('gallery_images', 10), stringToArray('tags', 'colors')], ProductController.updateProduct);

module.exports = {
    adminProductRouter,
}