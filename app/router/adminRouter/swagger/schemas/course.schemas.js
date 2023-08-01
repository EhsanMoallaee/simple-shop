// Info: Swagger Schemas:

// Info: Add Course Schema
/**
 * @swagger
 *  components:
 *      schemas:
 *          AddCourse:
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
 *                  -   image
 *              properties:
 *                  type:
 *                      type: string
 *                      enum: ['CASH', 'FREE', 'VIP']
 *                      description: Type of course price payment
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
 *                      description: The list of tags
 *                  category:
 *                      type: string
 *                      description: Id of category as a foreign key
 *                  price:
 *                      type: integer
 *                      description: price of course (Rial)
 *                  discount:
 *                      type: integer
 *                      description: discount of course (Rial)
 *                  image:
 *                      type: string
 *                      format: binary
 *                      description: image of course
*/

// Info: Update Course Schema
/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateCourse:
 *              type: object
 *              properties:
 *                  type:
 *                      type: string
 *                      enum: ['CASH', 'FREE', 'VIP']
 *                      description: Type of course price payment
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
 *                      description: The list of tags
 *                  category:
 *                      type: string
 *                      description: Id of category as a foreign key
 *                  price:
 *                      type: integer
 *                      description: price of course (Rial)
 *                  discount:
 *                      type: integer
 *                      description: discount of course (Rial)
 *                  image:
 *                      type: string
 *                      format: binary
 *                      description: image of course
*/