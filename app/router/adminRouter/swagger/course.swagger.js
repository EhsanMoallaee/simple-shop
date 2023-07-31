// Info: Swagger Routes:

// Info: Add Course:
/**
 * @swagger
 * /admin/courses/add:
 *  post:
 *      tags: [-Course]
 *      summary: Add one course
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/AddCourse'
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

// Info: Get All Courses List:
/**
 * @swagger
 * /admin/courses/list:
 *  get:
 *      tags: [-Course]
 *      summary: Get all Courses
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
 *                          $ref: '#/definitions/ListOfCourses'
 *          400:
 *              description: Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Failed-Response-Client-Error'
 *          404:
 *              description: Courses not found 
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

// Info: Get One Course:
/**
 * @swagger
 * /admin/courses/{id}:
 *  get:
 *      tags: [-Course]
 *      summary: Get Course by id
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *              description: Course Id
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/GetOneCourse'
 *          400:
 *              description: Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Failed-Response-Client-Error'
 *          404:
 *              description: Course not found
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