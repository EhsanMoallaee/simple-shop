// Info: Add Namespace:
/**
 * @swagger
 * /support/namespace/add:
 *  post:
 *      tags: [-Namespace]
 *      summary: Create new namespace
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema: 
 *                      $ref: '#/components/schemas/AddNamespace' 
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/AddNamespace' 
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

// Info: Get All Namespaces List:
/**
 * @swagger
 * /support/namespace/list:
 *  get:
 *      tags: [-Namespace]
 *      summary: Get all namespace
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/ListOfNamespaces'
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