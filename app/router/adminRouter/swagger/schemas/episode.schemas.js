// Info: Add Episode To Chapter Of A Course Schema:
/**
 * @swagger
 *  components:
 *      schemas:
 *          AddEpisodeToChapter:
 *              type: object
 *              required:
 *              -   courseId
 *              -   chapterId
 *              -   title
 *              -   text
 *              -   type
 *              -   video
 *              properties:
 *                  courseId:
 *                      type: string
 *                      example: "64c5fd827fea58511d02109b"
 *                      description: course id
 *                  chapterId:
 *                      type: string
 *                      example: "64c7070f9c1307558a0ba24a"
 *                      description: chapter id
 *                  title:
 *                      type: string
 *                      example: episode 1 - npm
 *                      description: title of episode
 *                  text:
 *                      type: string
 *                      example: text for this episode
 *                  type:
 *                      type: array
 *                      items:
 *                          type: string
 *                          enum: ['LOCK', 'UNLOCK']
 *                      explode: false
 *                  video:
 *                      type: file
 *                      description: upload video file
*/

// Info: Update Episode Schema:
/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateEpisode:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      example: episode 1 - npm
 *                      description: title of episode
 *                  text:
 *                      type: string
 *                      example: text for this episode
 *                  type:
 *                      type: array
 *                      items:
 *                          type: string
 *                          enum: ['LOCK', 'UNLOCK']
 *                      explode: false
 *                  video:
 *                      type: file
 *                      description: upload video file
*/