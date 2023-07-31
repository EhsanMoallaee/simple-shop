// Info: Swagger Routes:

// Info: Add Chapter To Course:
/**
 * @swagger
 * /admin/chapters/add:
 *  put:
 *      tags: [-Chapter]
 *      summary: Add chapter to course by course id
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/AddChapterToCourse'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AddChapterToCourse'
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

// Info: Get Chapters List Of A Course:
/**
 * @swagger
 * /admin/chapters/list/{id}:
 *  get:
 *      tags: [-Chapter]
 *      summary: Get chapters of course by course id
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *              description: course id
 *              example: "64c5fd827fea58511d02109b"
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/ListOfOndeCourseChapters'
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

// Info: Remove Chapter From A Course:
/**
 * @swagger
 * /admin/chapters/{chapterId}:
 *  patch:
 *      tags: [-Chapter]
 *      summary: Remove chapter from a course by chapter id
 *      parameters:
 *          -   in: path
 *              name: chapterId
 *              type: string
 *              required: true
 *              description: chapter id
 *              example: "64c5fd827fea58511d02109b"
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

// Info: Update Chapter:
/**
 * @swagger
 * /admin/chapters/update/{chapterId}:
 *  patch:
 *      tags: [-Chapter]
 *      summary: Update chapter of a course by course id
 *      parameters:
 *          -   in: path
 *              name: chapterId
 *              type: string
 *              required: true
 *              description: chapter id
 *              example: "64c5fd827fea58511d02109b"
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateChapter'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateChapter'
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