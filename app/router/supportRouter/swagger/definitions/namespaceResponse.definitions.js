// Info: One Namespace (for use in response format):
/**
 * @swagger
 *  definitions:
 *      Namespace_Response:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  example: "64c4a8a137d3d87d79688619"
 *              title:
 *                  type: string
 *                  example: title of namespace
 *              endpoint:
 *                  type: string
 *                  example: endpoint of namespace
 *              rooms:
 *                  type: array
 *                  items: 
 *                      $ref: '#/definitions/ListOfRooms'
 */

// Info: List Of Namespaces (response format):
/**
 * @swagger
 *  definitions:
 *      ListOfNamespaces:
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
 *                      $ref: '#/definitions/Namespace_Response'
 */