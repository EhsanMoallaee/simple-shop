// Info: One User (for use in response format):
/**
 * @swagger
 *  definitions:
 *      User_Response:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  example: "64c4a8a137d3d87d79688619"
 *              first_name:
 *                  type: string
 *                  example: "first name of user"
 *              last_name:
 *                  type: string
 *                  example: "last name of user"
 *              username:
 *                  type: string
 *                  example: "username"
 *              mobile:
 *                  type: string
 *                  example: '09000000001'
 *              email:
 *                  type: string
 *                  example: 'email@mail.com'
 *              birthday:
 *                  type: string
 *                  example: '1978/2/2'
 *              bills:
 *                  type: array
 *                  items:
 *                      type: string
 *                      example: [bill]
 *              roles:
 *                  type: array
 *                  items: 
 *                      type: string
 *                      example: "USER"
 *              courses:
 *                  type: array
 *                  items: 
 *                      type: string
 *                      example: "course-1"
 */

// Info: List Of Users (response format):
/**
 * @swagger
 *  definitions:
 *      ListOfUsers:
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
 *                      $ref: '#/definitions/User_Response'
 */