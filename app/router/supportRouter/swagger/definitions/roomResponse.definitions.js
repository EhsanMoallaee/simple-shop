// Info: One Room (for use in response format):
/**
 * @swagger
 *  definitions:
 *      Romm_Response:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  example: "64c4a8a137d3d87d79688619"
 *              name:
 *                  type: string
 *                  example: title of room
 *              description:
 *                  type: string
 *                  example: endpoint of room
 *              image:
 *                  type: string
 *                  example: endpoint of room
 *              messages:
 *                  type: array
 *                  items: 
 *                      $ref: '#/components/schemas/Messages_SubSchema'
 */

// Info: List Of Rooms (response format):
/**
 * @swagger
 *  definitions:
 *      ListOfRooms:
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
 *                      $ref: '#/definitions/Romm_Response'
 */
