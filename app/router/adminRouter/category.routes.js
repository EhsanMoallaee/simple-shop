const { Router } = require('express');
const { CategoryController } = require('../../http/controllers/adminControllers/category.controller');
const categoryRouter = Router();

/**
 * @swagger
 * /admin/category/add:
 *  post:
 *      tags: [-Category]
 *      summary: Create new category
 *      parameters:
 *      -   name: access-token
 *          in: header
 *          type: string
 *          required: true
 *          example: Beare token
 *          value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Im1vYmlsZSI6IjA5Mzc1MzM4ODc1In0sImlhdCI6MTY5MDQyNzc0MywiZXhwIjoxNzA1OTc5NzQzfQ.dLfT7SqGOVp1pQOn0NaRwKdJmdkScUoPQl4wuSxLDws
 *      -   name: title
 *          in: formData
 *          type: string
 *          required: true
 *      -   name: parent
 *          in: formData
 *          type: string
 *          required: false
 *      responses:
 *          201:
 *              description: Success
 */
categoryRouter.post('/add', CategoryController.addCategory);

/**
 * @swagger
 * /admin/category/root-categories:
 *  get:
 *      tags: [-Category]
 *      summary: This route returns all root categories
 *      parameters:
 *      -   name: access-token
 *          in: header
 *          type: string
 *          required: true
 *          example: Beare token
 *          value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Im1vYmlsZSI6IjA5Mzc1MzM4ODc1In0sImlhdCI6MTY5MDQyNzc0MywiZXhwIjoxNzA1OTc5NzQzfQ.dLfT7SqGOVp1pQOn0NaRwKdJmdkScUoPQl4wuSxLDws
 *      responses:
 *          200:
 *              description: Success
 */
categoryRouter.get('/root-categories', CategoryController.getAllRootCategories);

/**
 * @swagger
 * /admin/category/children/{parent}:
 *  get:
 *      tags: [-Category]
 *      summary: This route returns all children of a category
 *      parameters:
 *      -   name: access-token
 *          in: header
 *          type: string
 *          required: true
 *          example: Beare token
 *          value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Im1vYmlsZSI6IjA5Mzc1MzM4ODc1In0sImlhdCI6MTY5MDQyNzc0MywiZXhwIjoxNzA1OTc5NzQzfQ.dLfT7SqGOVp1pQOn0NaRwKdJmdkScUoPQl4wuSxLDws
 *      -   name: parent
 *          in: path
 *          required: true
 *          type: string
 *      responses:
 *          200:
 *              description: Success
 */
categoryRouter.get('/children/:parent', CategoryController.getChildsOfCategory);

/**
 * @swagger
 * /admin/category/all:
 *  get:
 *      tags: [-Category]
 *      summary: This route returns all categories
 *      parameters:
 *      -   name: access-token
 *          in: header
 *          type: string
 *          required: true
 *          example: Beare token
 *          value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Im1vYmlsZSI6IjA5Mzc1MzM4ODc1In0sImlhdCI6MTY5MDQyNzc0MywiZXhwIjoxNzA1OTc5NzQzfQ.dLfT7SqGOVp1pQOn0NaRwKdJmdkScUoPQl4wuSxLDws
 *      responses:
 *          200:
 *              description: Success
 */
categoryRouter.get('/all', CategoryController.getAllCategories);

/**
 * @swagger
 * /admin/category/remove/{id}:
 *  delete:
 *      tags: [-Category]
 *      summary: This route delete a category by id
 *      parameters:
 *      -   name: access-token
 *          in: header
 *          type: string
 *          required: true
 *          example: Beare token
 *          value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Im1vYmlsZSI6IjA5Mzc1MzM4ODc1In0sImlhdCI6MTY5MDQyNzc0MywiZXhwIjoxNzA1OTc5NzQzfQ.dLfT7SqGOVp1pQOn0NaRwKdJmdkScUoPQl4wuSxLDws
 *      -   name: id
 *          in: path
 *          required: true
 *          type: string
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Category not found
 */
categoryRouter.delete('/remove/:id', CategoryController.removeCategory);

/**
 * @swagger
 * /admin/category/list-of-all:
 *  get:
 *      tags: [-Category]
 *      summary: Get all categories without populate and nested structure
 *      parameters:
 *      -   name: access-token
 *          in: header
 *          type: string
 *          required: true
 *          example: Beare token
 *          value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Im1vYmlsZSI6IjA5Mzc1MzM4ODc1In0sImlhdCI6MTY5MDQyNzc0MywiZXhwIjoxNzA1OTc5NzQzfQ.dLfT7SqGOVp1pQOn0NaRwKdJmdkScUoPQl4wuSxLDws
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Category not found
 */
categoryRouter.get('/list-of-all', CategoryController.getAllCategoriesWithoutPopulate);

/**
 * @swagger
 * /admin/category/{id}:
 *  get:
 *      tags: [-Category]
 *      summary: This route find a category and it's children by id
 *      parameters:
 *      -   name: access-token
 *          in: header
 *          type: string
 *          required: true
 *          example: Beare token
 *          value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Im1vYmlsZSI6IjA5Mzc1MzM4ODc1In0sImlhdCI6MTY5MDQyNzc0MywiZXhwIjoxNzA1OTc5NzQzfQ.dLfT7SqGOVp1pQOn0NaRwKdJmdkScUoPQl4wuSxLDws
 *      -   name: id
 *          in: path
 *          required: true
 *          type: string
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Category not found
 */
categoryRouter.get('/:id', CategoryController.getCategoryById);

/**
 * @swagger
 * /admin/category/update/{id}:
 *  patch:
 *      tags: [-Category]
 *      summary: This route find a category by id and updates its title
 *      parameters:
 *      -   name: access-token
 *          in: header
 *          type: string
 *          required: true
 *          example: Beare token
 *          value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Im1vYmlsZSI6IjA5Mzc1MzM4ODc1In0sImlhdCI6MTY5MDQyNzc0MywiZXhwIjoxNzA1OTc5NzQzfQ.dLfT7SqGOVp1pQOn0NaRwKdJmdkScUoPQl4wuSxLDws
 *      -   name: id
 *          in: path
 *          required: true
 *          type: string
 *      -   name: title
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Category not found
 */
categoryRouter.patch('/update/:id', CategoryController.updateCategory);

module.exports = {
    categoryRouter,
}