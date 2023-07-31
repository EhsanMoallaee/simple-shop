// Info: Chapters subschema
/**
 * @swagger
 *  components:
 *      schemas:
 *          Chapters_SubSchema:
 *              type: object
 *              properties:
 *                  title: 
 *                      type: string
 *                      example: "title of chapter"
 *                  text: 
 *                      type: string
 *                      example: "text of chapter"
 *                  episodes:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Episodes_SubSchema'
 */

// Info: Episodes subschema
/**
 * @swagger
 *  components:
 *      schemas:
 *          Episodes_SubSchema:
 *              type: object
 *              properties:
 *                  title: 
 *                      type: string
 *                      example: "title of chapter"
 *                  text: 
 *                      type: string
 *                      example: "text of chapter"
 *                  type:
 *                      type: string
 *                      example: "FREE | CASH | VIP"
 *                  time:
 *                      type: string
 *                      example: "01:20:45"
 */

// Info: Students subschema
/**
 * @swagger
 *  components:
 *      schemas:
 *          Students_SubSchema:
 *              type: object
 *              properties:
 *                  first_name: 
 *                      type: string
 *                      example: "name"
 *                  last_name: 
 *                      type: string
 *                      example: "family"
 *                  username: 
 *                      type: string
 *                      example: "username"
 *                  email: 
 *                      type: string
 *                      example: "user@mail.com"
 */
