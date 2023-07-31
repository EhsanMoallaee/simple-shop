// Info: Swagger Definitions (response format):

// Info: One Blog (for use in response format):
/**
 * @swagger
 *  definitions:
 *      Blog_Response:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  example: "64c4a8a137d3d87d79688619"
 *              author:
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
 */

// Info: List Of Blogs (response format):
/**
 * @swagger
 *  definitions:
 *      ListOfBlogs:
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
 *                      $ref: '#/definitions/Blog_Response'
 */

// Info: Get One Blogs (response format):
/**
 * @swagger
 *  definitions:
 *      GetOneBlog:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              success:
 *                  type: boolean
 *                  example: true
 *              data: 
 *                  $ref: '#/definitions/Blog_Response'
 */

