// Info: Swagger Routes:

// Info: Home page:
/**
 * @swagger
 * tags:
 *   name: HomePage
 *   description: Home page
 */

/**
 * @swagger
 * /:
 *  get:
 *      tags: [-HomePage]
 *      summary: This is index route
 *      description: First page
 *      parameters:
 *          -   in: header 
 *              name: access-token
 *              example: Bearer <...your token...>           
 *      responses: 
 *          200:
 *              description: success
 *          400: 
 *              description: Not Found
 */
