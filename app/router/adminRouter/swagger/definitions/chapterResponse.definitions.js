// Info: Course (for use in response format):
/**
 * @swagger
 *  definitions:
 *      Chapter_Response:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  example: "64c4a8a137d3d87d79688619"
 *              title:
 *                  type: string
 *                  example: "title of chapter"
 *              text:
 *                  type: string
 *                  example: "text of chapter"
 *              episodes:
 *                  type: array
 *                  items: 
 *                      _id: 
 *                          type: string
 *                          example: "64c4a8a137d3d87d79688619"
 *                      type: 
 *                          type: string
 *                          example: type of episode
 *                      time: 
 *                          type: string
 *                          example: "00:00:00"
 */

// Info: List Of One Course's Chapters (response format):
/**
 * @swagger
 *  definitions:
 *      ListOfOndeCourseChapters:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              success:
 *                  type: boolean
 *                  example: true
 *              data:
 *                  type: object
 *                  properties:
 *                      course: 
 *                          type: object
 *                          properties: 
 *                              _id: 
 *                                  type: string
 *                                  example: "64c707a881378b68169f344c"
 *                              title: 
 *                                  type: string
 *                                  example: title of course
 *                              chapters: 
 *                                  type: array 
 *                                  items: 
 *                                      $ref: '#/components/schemas/Chapters_SubSchema'
 */