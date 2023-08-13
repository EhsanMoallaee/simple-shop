// Info: Add Room:
/**
 * @swagger
 * /room/add:
 *  post:
 *      tags: [-Room]
 *      summary: Create new room
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema: 
 *                      $ref: '#/components/schemas/AddRoom' 
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/AddRoom' 
 *      responses:
 *          201:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Success-Response-Without-Data'
 *          400:
 *              description: Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Failed-Response-Client-Error'
 *          500:
 *              description: Internal server error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Failed-Response-Server-Error'
 */

// Info: Get All Rooms List:
/**
 * @swagger
 * /room/list:
 *  get:
 *      tags: [-Room]
 *      summary: Get all rooms
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/ListOfRooms'
 *          400:
 *              description: Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Failed-Response-Client-Error'
 *          404:
 *              description: Blogs not found 
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Not-Found-Response'
 *          500:
 *              description: Internal server error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Failed-Response-Server-Error'
 */