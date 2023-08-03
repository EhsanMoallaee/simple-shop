// Info: Swagger Definitions (response format):

// Info: One Permission (for use in response format):
/**
 * @swagger
 *  definitions:
 *      Permission_Response:
 *          type: object
 *          properties:
 *                  _id:
 *                      type: string
 *                      example: "64c029d4d0dcc4efe3a72e5a"
 *                  title:
 *                      type: string
 *                      example: "permission title"
 *                  description:
 *                      type: string
 *                      example: "Can edit products"
 */

// Info: List Of Permissions (response format):
/**
 * @swagger
 *  definitions:
 *      ListOfPermissions:
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
 *                      $ref: '#/definitions/Permission_Response'
 */