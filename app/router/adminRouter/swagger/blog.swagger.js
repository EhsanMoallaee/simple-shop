
// Info: Add Blog:
/**
 * @swagger
 * /admin/blogs/add:
 *  post:
 *      tags: [-Blog]
 *      summary: Create new blog
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema: 
 *                      $ref: '#/components/schemas/AddBlog' 
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

// Info: Get All Blogs List:
/**
 * @swagger
 * /admin/blogs:
 *  get:
 *      tags: [-Blog]
 *      summary: Get all blogs
 *      parameters:
 *          -   in: query
 *              name: search
 *              type: string
 *              description: text for searching in title,brief_text and text
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/ListOfBlogs'
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

// Info: Get One Blog:
/**
 * @swagger
 * /admin/blogs/{id}:
 *  get:
 *      tags: [-Blog]
 *      summary: Get one blog by id
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *              description: Blog Id
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/GetOneBlog'
 *          400:
 *              description: Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Failed-Response-Client-Error'
 *          404:
 *              description: Blog not found
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

// Info: Delete One Blog:
/**
 * @swagger
 * /admin/blogs/{id}:
 *  delete:
 *      tags: [-Blog]
 *      summary: Delete one blog by id
 *      parameters:
 *      -   name: id
 *          in: path
 *          type: string
 *          required: true
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
 *              description: Blog not found
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

// Info: Update One Blog:
/**
 * @swagger
 * /admin/blogs/update/{id}:
 *  patch:
 *      tags: [-Blog]
 *      summary: Update a blog
 *      parameters:
 *      -   name: id
 *          in: path
 *          type: string
 *          required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateBlog'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateBlog'
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
 *              description: Blog not found
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