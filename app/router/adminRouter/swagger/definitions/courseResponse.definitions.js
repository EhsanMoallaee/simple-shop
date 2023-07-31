// Info: Swagger Definitions (response format):

// Info: Course (for use in response format):
/**
 * @swagger
 *  definitions:
 *      Course_Response:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  example: "64c4a8a137d3d87d79688619"
 *              title:
 *                  type: string
 *                  example: "title of course"
 *              brief_text:
 *                  type: string
 *                  example: "brief_text of course"
 *              text:
 *                  type: string
 *                  example: "text of course"
 *              image:
 *                  type: string
 *                  example: 'uploads/blogs/2023/7/29/img1690661404804-imagename.png'
 *              tags:
 *                  type: array
 *                  items: 
 *                      type: string
 *                      example: "tag1"
 *              category:
 *                  type: string
 *                  example: "64c4a8a137d3d87d79688619"
 *              comments:
 *                  type: string
 *                  example: title of course
 *              likes:
 *                  type: string
 *                  example: title of course
 *              dislikes:
 *                  type: string
 *                  example: title of course
 *              bookmarks:
 *                  type: array
 *                  items:
 *                      type: string
 *                      example: "64c4a8a137d3d87d79688619"
 *              price:
 *                  type: integer
 *                  example: 25000000
 *              discount:
 *                  type: integer
 *                  example: 2500000
 *              type:
 *                  type: string
 *                  example: "FREE | CASH | VIP"
 *              status:
 *                  type: string
 *                  example: "not_started | completed | on_performing"
 *              time:
 *                  type: string
 *                  example: "01:20:45"
 *              teacher:
 *                  type: string
 *                  example: "64c4a8a137d3d87d79688619"
 *              chapters:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Chapters_SubSchema'    
 *              students:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Students_SubSchema'
 */

// Info: List Of Courses (response format):
/**
 * @swagger
 *  definitions:
 *      ListOfCourses:
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
 *                      $ref: '#/definitions/Course_Response'
 */

// Info: Get One Course (response format):
/**
 * @swagger
 *  definitions:
 *      GetOneCourse:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              success:
 *                  type: boolean
 *                  example: true
 *              data: 
 *                  $ref: '#/definitions/Course_Response'
 */

