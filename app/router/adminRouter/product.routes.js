const { Router } = require('express');
const { ProductController } = require('../../http/controllers/adminControllers/product.controller');
const { imageUploader } = require('../../utils/multer/image.uploader');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const adminProductRouter = Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  -   type
 *                  -   title
 *                  -   brief_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   count
 *                  -   gallery_images
 *              properties:
 *                  type:
 *                      type: string
 *                      enum: ['REAL_PRODUCT', 'VIRTUAL_PRODUCT']
 *                      description: Type of product
 *                  title:
 *                      type: string
 *                      description: Title of product
 *                  brief_text:
 *                      type: string
 *                      description: Brief text of product
 *                  text:
 *                      type: string
 *                      description: Text of product
 *                  tags:
 *                      type: array
 *                      description: The list of tags, example 'tag1#tag2#tag_3'
 *                  category:
 *                      type: string
 *                      description: Id of category as a foreign key
 *                  supplier:
 *                      type: string
 *                      description: supplier of product
 *                  price:
 *                      type: integer
 *                      description: price of product (Rial)
 *                  discount:
 *                      type: integer
 *                      description: discount of product (Rial)
 *                  count:
 *                      type: integer
 *                      description: count of product
 *                  height:
 *                      type: integer
 *                      description: height of product (Centimeter)
 *                  width:
 *                      type: integer
 *                      description: width of product (Centimeter)
 *                  length:
 *                      type: integer
 *                      description: length of product (Centimeter)
 *                  weigth:
 *                      type: integer
 *                      description: weigth of product (Gram)
 *                  gallery_images:
 *                      type: array
 *                      items: 
 *                          type: string
 *                          format: binary
 *                      description: Gallery images of product at least one image is required
*/

//  *                  image:
//  *                      type: file
//  *                      description: Main image of product

/**
 * @swagger
 * /admin/products/add:
 *  post:
 *      tags: [-Product]
 *      summary: Add one Product
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *      responses:
 *          201:
 *              description: Success
 */
adminProductRouter.post('/add', [imageUploader.array('gallery_images', 10), stringToArray('tags')], ProductController.addProduct);

/**
 * @swagger
 * /admin/products/list:
 *  get:
 *      tags: [-Product]
 *      summary: Get all Products
 *      responses:
 *          200:
 *              description: Success
 */
adminProductRouter.get('/list', ProductController.getAllProducts);


module.exports = {
    adminProductRouter,
}