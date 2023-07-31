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
