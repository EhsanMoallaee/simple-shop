const { Router } = require('express');
const { BlogController } = require('../../http/controllers/adminControllers/blog.controller');
const { imageUploader } = require('../../utils/multer/image.uploader');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const blogRouter = Router();

/**
 * @swagger
 * /admin/blogs:
 *  get:
 *      tags: [Blog]
 *      summary: Get all blogs
 *      parameters:
 *      -   name: access-token
 *          in: header
 *          type: string
 *          required: true
 *          example: Beare token
 *          value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Im1vYmlsZSI6IjA5Mzc1MzM4ODc1In0sImlhdCI6MTY5MDM0MjE1MSwiZXhwIjoxNzIxODk5NzUxfQ.wo9uMNxrjuAxUSYAlGY6zPPR6_IKpZeG0PSWR_hfQdw
 *      responses:
 *          200:
 *              description: Success
 */
blogRouter.get('/', BlogController.getAllBlogs);

/**
 * @swagger
 * /admin/blogs/add:
 *  post:
 *      tags: [Blog]
 *      summary: Create new blog
 *      consumes:
 *          -   multipart/form-data
 *          -   application/x-ww-form-data-urlencoded
 *      produces:
 *          -   multipart/form-data
 *          -   application/x-ww-form-data-urlencoded
 *      parameters:
 *      -   name: access-token
 *          in: header
 *          type: string
 *          required: true
 *          example: Beare token
 *          value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Im1vYmlsZSI6IjA5Mzc1MzM4ODc1In0sImlhdCI6MTY5MDM0MjE1MSwiZXhwIjoxNzIxODk5NzUxfQ.wo9uMNxrjuAxUSYAlGY6zPPR6_IKpZeG0PSWR_hfQdw
 *      -   name: title
 *          in: formData
 *          type: string
 *          required: true
 *      -   name: text
 *          in: formData
 *          type: string
 *          required: true
 *      -   name: brief_text
 *          in: formData
 *          type: string
 *          required: true
 *      -   name: tags
 *          in: formData
 *          type: string
 *          required: false
 *          example: tag1#tag2#tag3_foo#foo_bar
 *      -   name: category
 *          in: formData
 *          type: string
 *          required: true
 *      -   name: image
 *          in: formData
 *          type: file
 *          required: true
 *      responses:
 *          201:
 *              description: Success
 */
blogRouter.post('/add', [imageUploader.single('image'), stringToArray('tags')], BlogController.addBlog);

/**
 * @swagger
 * /admin/blogs/{id}:
 *  get:
 *      tags: [Blog]
 *      summary: Get one blog by id
 *      parameters:
 *      -   name: id
 *          in: path
 *          type: string
 *          required: true
 *      -   name: access-token
 *          in: header
 *          type: string
 *          required: true
 *          example: Beare token
 *          value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Im1vYmlsZSI6IjA5Mzc1MzM4ODc1In0sImlhdCI6MTY5MDM0MjE1MSwiZXhwIjoxNzIxODk5NzUxfQ.wo9uMNxrjuAxUSYAlGY6zPPR6_IKpZeG0PSWR_hfQdw
 *      responses:
 *          200:
 *              description: Success
 */
blogRouter.get('/:id', BlogController.getBlogById);

/**
 * @swagger
 * /admin/blogs/{id}:
 *  delete:
 *      tags: [Blog]
 *      summary: Delete one blog by id
 *      parameters:
 *      -   name: id
 *          in: path
 *          type: string
 *          required: true
 *      -   name: access-token
 *          in: header
 *          type: string
 *          required: true
 *          example: Beare token
 *          value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Im1vYmlsZSI6IjA5Mzc1MzM4ODc1In0sImlhdCI6MTY5MDM0MjE1MSwiZXhwIjoxNzIxODk5NzUxfQ.wo9uMNxrjuAxUSYAlGY6zPPR6_IKpZeG0PSWR_hfQdw
 *      responses:
 *          200:
 *              description: Success
 */
blogRouter.delete('/:id', BlogController.deleteBlogById);

/**
 * @swagger
 * /admin/blogs/update/{id}:
 *  patch:
 *      tags: [Blog]
 *      summary: Update a blog
 *      consumes:
 *          -   multipart/form-data
 *          -   application/x-ww-form-data-urlencoded
 *      produces:
 *          -   multipart/form-data
 *          -   application/x-ww-form-data-urlencoded
 *      parameters:
 *      -   name: access-token
 *          in: header
 *          type: string
 *          required: true
 *          example: Beare token
 *          value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Im1vYmlsZSI6IjA5Mzc1MzM4ODc1In0sImlhdCI6MTY5MDM0MjE1MSwiZXhwIjoxNzIxODk5NzUxfQ.wo9uMNxrjuAxUSYAlGY6zPPR6_IKpZeG0PSWR_hfQdw
 *      -   name: id
 *          in: path
 *          type: string
 *          required: true
 *      -   name: title
 *          in: formData
 *          type: string
 *      -   name: text
 *          in: formData
 *          type: string
 *      -   name: brief_text
 *          in: formData
 *          type: string
 *      -   name: tags
 *          in: formData
 *          type: string
 *          required: false
 *          example: tag1#tag2#tag3_foo#foo_bar
 *      -   name: category
 *          in: formData
 *          type: string
 *      -   name: image
 *          in: formData
 *          type: file
 *      responses:
 *          201:
 *              description: Success
 */
blogRouter.patch('/update/:id', [imageUploader.single('image'), stringToArray('tags')], BlogController.updateBlogById);

module.exports = {
    blogRouter,
}