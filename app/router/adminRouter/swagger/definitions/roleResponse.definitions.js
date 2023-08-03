// Info: Swagger Definitions (response format):

// Info: One Role (for use in response format):
/**
 * @swagger
 *  definitions:
 *      Role_Response:
 *          type: object
 *          properties:
 *                  _id:
 *                      type: string
 *                      example: "64c029d4d0dcc4efe3a72e5a"
 *                  title:
 *                      type: string
 *                      example: "role title"
 *                  description:
 *                      type: string
 *                      example: "role description"
 *                  permissions:
 *                      type: array
 *                      items:
 *                          $ref: '#/definitions/Permission_Response'
 */

// Info: List Of Roles (response format):
/**
 * @swagger
 *  definitions:
 *      ListOfRoles:
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
 *                      $ref: '#/definitions/Role_Response'
 */