// Info: Swagger Definitions (response format):

// Info: One Product (for use in response format):
/**
 * @swagger
 *  definitions:
 *      Product_Response:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  example: "64c4a8a137d3d87d79688619"
 *              title:
 *                  type: string
 *                  example: "title of product"
 *              brief_text:
 *                  type: string
 *                  example: "brief_text of product"
 *              text:
 *                  type: string
 *                  example: "text of product"
 *              image:
 *                  type: string
 *                  example: 'uploads/blogs/2023/7/29/img1690661404804-imagename.png'
 *              gallery_images:
 *                  type: array
 *                  items:
 *                      type: string
 *                      example: ['uploads/blogs/2023/7/29/img1690661404804-imagename.png']
 *              tags:
 *                  type: array
 *                  items: 
 *                      type: string
 *                      example: "tag1"
 *              category:
 *                  type: string
 *                  example: "64c4a8a137d3d87d79688619"
 *              comments:
 *                  type: array
 *                  items: 
 *                      type: string
 *                      example: "comment 1"
 *              likes:
 *                  type: string
 *                  example: title of product
 *              dislikes:
 *                  type: string
 *                  example: title of product
 *              bookmarks:
 *                  type: array
 *                  items:
 *                      type: string
 *                      example: "64c4a8a137d3d87d79688619"
 *              price:
 *                  type: integer
 *                  example: 25000000
 *              discount:
 *                  type: integer
 *                  example: 1500000
 *              count:
 *                  type: integer
 *                  example: 250
 *              type:
 *                  type: string
 *                  example: "REAL_PRODUCT | VIRTUAL_PRODUCT"
 *              format:
 *                  type: string
 *                  example: "format of product"
 *              supplier:
 *                  type: string
 *                  example: "name of product's supplier"
 *              features:
 *                  type: object
 *                  properties:
 *                      length:
 *                          type: integer
 *                          example: 1
 *                      height:
 *                          type: integer
 *                          example: 2
 *                      width:
 *                          type: integer
 *                          example: 3
 *                      weight:
 *                          type: integer
 *                          example: 4
 *                      colors:
 *                          type: array
 *                          items:
 *                              type: string
 *                              example: "red"
 *                      made_in:
 *                          type: string
 *                          example: "name of product's supplier"
 */

// Info: List Of Products (response format):
/**
 * @swagger
 *  definitions:
 *      ListOfBlogs:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              success:
 *                  type: boolean
 *                  example: true
 *              data:
 *                  type: array
 *                  items: 
 *                      $ref: '#/definitions/Product_Response'
 */

// Info: Get One Product (response format):
/**
 * @swagger
 *  definitions:
 *      GetOneBlog:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              success:
 *                  type: boolean
 *                  example: true
 *              data: 
 *                  $ref: '#/definitions/Product_Response'
 */

