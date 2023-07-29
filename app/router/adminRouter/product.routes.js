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
 *                  made_in:
 *                      type: string
 *                      description: weigth of product (Gram)
 *                  colors:
 *                      type: array
 *                      items:
 *                          type: string
 *                          enum: ['Red', 'Green', 'Black', 'White', 'Blue', 'Yellow', 'Brown']
 *                      explode: false
 *                      description: weigth of product (Gram)
 *                  gallery_images:
 *                      type: array
 *                      items: 
 *                          type: string
 *                          format: binary
 *                      description: Gallery images of product at least one image is required
 *          UpdateProduct:
 *              type: object
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
 *                  made_in:
 *                      type: string
 *                      description: weigth of product (Gram)
 *                  colors:
 *                      type: array
 *                      items:
 *                          type: string
 *                          enum: ['Red', 'Green', 'Black', 'White', 'Blue', 'Yellow', 'Brown']
 *                      explode: false
 *                      description: weigth of product (Gram)
 *                  gallery_images:
 *                      type: array
 *                      items: 
 *                          type: string
 *                          format: binary
 *                      description: Gallery images of product at least one image is required
*/

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
adminProductRouter.post('/add', [imageUploader.array('gallery_images', 10), stringToArray('tags'), stringToArray('colors')], ProductController.addProduct);

/**
 * @swagger
 * /admin/products/list:
 *  get:
 *      tags: [-Product]
 *      summary: Get all Products
 *      parameters:
 *          -   in: query
 *              name: search
 *              type: string
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Failed to find product
 */
adminProductRouter.get('/list', ProductController.getAllProducts);

/**
 * @swagger
 * /admin/products/{productId}:
 *  get:
 *      tags: [-Product]
 *      summary: Get one Product by id
 *      parameters:
 *          -   name: productId
 *              in: path
 *              required: true
 *              type: string
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Failed to find product
 */
adminProductRouter.get('/:productId', ProductController.getProductById);

/**
 * @swagger
 * /admin/products/remove/{id}:
 *  delete:
 *      tags: [-Product]
 *      summary: Delete one Product by id
 *      parameters:
 *          -   name: id
 *              in: path
 *              required: true
 *              type: string
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Failed to find product
 */
adminProductRouter.delete('/remove/:id', ProductController.removeProduct);

/**
 * @swagger
 * /admin/products/update/{id}:
 *  patch:
 *      tags: [-Product]
 *      summary: Add one Product
 *      parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: Id of product which should be updated
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateProduct'
 *      responses:
 *          200:
 *              description: Product updated successfully
 */
adminProductRouter.patch('/update/:id', [imageUploader.array('gallery_images', 10), stringToArray('tags'), stringToArray('colors')], ProductController.updateProduct);


module.exports = {
    adminProductRouter,
}