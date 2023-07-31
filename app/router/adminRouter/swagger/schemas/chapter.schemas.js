// Info: Swagger Schemas:

// Info: Add Chapter To Course Schema
/**
 * @swagger
 *  components:
 *      schemas:
 *          AddChapterToCourse:
 *              type: object
 *              required:
 *              -   id
 *              -   title
 *              properties:
 *                  id:
 *                      type: string
 *                      description: course id
 *                  title:
 *                      type: string
 *                      example: chapter 1 nodejs api
 *                      description: title of chapter
 *                  text:
 *                      type: string
 *                      example: text for this chapter
*/

// Info: Update Chapter (title & text) Schema
/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateChapter:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      example: chapter 1 nodejs api
 *                      description: title of chapter
 *                  text:
 *                      type: string
 *                      example: text for this chapter
 *                      description: text (description) of chapter
*/
