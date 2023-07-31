// Info: Swagger Schemas:

// Info: Add Course Schema
/**
 * @swagger
 *  components:
 *      schemas:
 *          AddBlog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   brief_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                      description: Title of course
 *                  brief_text:
 *                      type: string
 *                      description: Brief text of course
 *                  text:
 *                      type: string
 *                      description: Text of course
 *                  tags:
 *                      type: array
 *                      description: The list of tags as an array
 *                  category:
 *                      type: string
 *                      description: Id of category as a foreign key
 *                  image:
 *                      type: string
 *                      format: binary
 *                      description: image of course
*/

// Info: Update Blog Schema
/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateBlog:
 *              type: object
 *              properties:
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
 *                      description: The list of tags as an array
 *                  category:
 *                      type: string
 *                      description: Id of category as a foreign key
 *                  image:
 *                      type: string
 *                      format: binary
 *                      description: image of blog
*/