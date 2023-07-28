const { Router } = require('express');
const { BlogController } = require('../../http/controllers/adminControllers/blog.controller');
const { imageUploader } = require('../../utils/multer/image.uploader');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const adminBlogRouter = Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Blog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   brief_text
 *                  -   text
 *                  -   image
 *                  -   tags
 *                  -   category
 *              properties:
 *                  title:
 *                      type: string
 *                      description: Title of blog
 *                  brief_text:
 *                      type: string
 *                      description: Brief text of blog
 *                  text:
 *                      type: string
 *                      description: Text of blog
 *                  tags:
 *                      type: string
 *                      description: The list of tags, example 'tag1#tag2#tag_3'
 *                  category:
 *                      type: string
 *                      description: Id of category as a foreign key
 *                  image:
 *                      type: file
 *                      description: Index picture of blog
 */

/**
 * @swagger
 * /admin/blogs:
 *  get:
 *      tags: [-Blog]
 *      summary: Get all blogs
 *      responses:
 *          200:
 *              description: Success
 */
adminBlogRouter.get('/', BlogController.getAllBlogs);

/**
 * @swagger
 * /admin/blogs/add:
 *  post:
 *      tags: [-Blog]
 *      summary: Create new blog
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema: 
 *                      $ref: '#/components/schemas/Blog'
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Bad request
 */
adminBlogRouter.post('/add', [imageUploader.single('image'), stringToArray('tags')], BlogController.addBlog);

/**
 * @swagger
 * /admin/blogs/{id}:
 *  get:
 *      tags: [-Blog]
 *      summary: Get one blog by id
 *      parameters:
 *      -   name: id
 *          in: path
 *          type: string
 *          required: true
 *      responses:
 *          200:
 *              description: Success
 */
adminBlogRouter.get('/:id', BlogController.getBlogById);

/**
 * @swagger
 * /admin/blogs/{id}:
 *  delete:
 *      tags: [-Blog]
 *      summary: Delete one blog by id
 *      parameters:
 *      -   name: id
 *          in: path
 *          type: string
 *          required: true
 *      responses:
 *          200:
 *              description: Success
 */
adminBlogRouter.delete('/:id', BlogController.deleteBlogById);

/**
 * @swagger
 * /admin/blogs/update/{id}:
 *  patch:
 *      tags: [-Blog]
 *      summary: Update a blog
 *      parameters:
 *      -   name: id
 *          in: path
 *          type: string
 *          required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/Blog'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Blog'
 *      responses:
 *          201:
 *              description: Success
 */
adminBlogRouter.patch('/update/:id', [imageUploader.single('image'), stringToArray('tags')], BlogController.updateBlogById);

module.exports = {
    adminBlogRouter,
}