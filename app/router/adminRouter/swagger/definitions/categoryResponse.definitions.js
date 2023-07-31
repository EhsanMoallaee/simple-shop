// Info: Swagger Definitions (response format):

// Info: One Category (for use in response format):
/**
 * @swagger
 *  definitions:
 *      Category_Response:
 *          type: object
 *          properties:
 *                  _id:
 *                      type: string
 *                      example: "64c029d4d0dcc4efe3a72e5a"
 *                  title:
 *                      type: string
 *                      example: "category title"
 *                  parent:
 *                      type: string
 *                      example: "64c029d4d0dcc4efe3a72e5a"
 */

// Info: List Of Categories (response format):
/**
 * @swagger
 *  definitions:
 *      ListOfCategories:
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
 *                      $ref: '#/definitions/Category_Response'
 */

// Info: List Of Categories With Populate And Nested Children (response format):
/**
 * @swagger
 *  definitions:
 *      ListOfCategoriesWithChildren:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              success:
 *                  type: boolean
 *                  example: true
 *              data:
 *                  type: object
 *                  properties: 
 *                      allCategories:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "64c029d4d0dcc4efe3a72e5a"
 *                                  title:
 *                                      type: string
 *                                      example: "category title"
 *                                  children:
 *                                      type: array
 *                                      items:
 *                                          $ref: '#/definitions/Category_Response'
 */

// Info: Get One Category (response format):
/**
 * @swagger
 *  definitions:
 *      GetOneCategory:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              success:
 *                  type: boolean
 *                  example: true
 *              data: 
 *                  $ref: '#/definitions/Category_Response'
 */
