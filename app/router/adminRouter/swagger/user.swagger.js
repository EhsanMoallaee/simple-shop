// Info: Swagger Routes:

// Info: Get All Users List:
/**
 * @swagger
 * /admin/users/list:
 *  get:
 *      tags: [-User]
 *      summary: Get all Users
 *      parameters:
 *          -   in: query
 *              name: search
 *              type: string
 *              description: text for searching in [first_name, last_name, username, email, mobile]
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/ListOfUsers'
 *          400:
 *              description: Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Failed-Response-Client-Error'
 *          404:
 *              description: Products not found 
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

// Info: Update User:
/**
 * @swagger
 * /admin/users/update/{id}:
 *  patch:
 *      tags: [-User]
 *      summary: Update one user
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *              description: User Id
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateUser'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateUser'
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

// Info: Set User Permissions:
/**
 * @swagger
 * /admin/users/set-permissions/{id}:
 *  patch:
 *      tags: [-User]
 *      summary: Set user permissions
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *              description: User Id
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/SetUserPermissions'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/SetUserPermissions'
 *      responses:
 *          200:
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

// Info: Get User Full Data:
/**
 * @swagger
 * /admin/users/data/{id}:
 *  get:
 *      tags: [-User]
 *      summary: Get user Full Data
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *              description: User Id
 *      responses:
 *          200:
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
 *          404:
 *              description: Not Found
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