// Info: Swagger Schemas:

// Info: Add Role Schema
/**
 * @swagger
 *  components:
 *      schemas:
 *          AddRole:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of role
 *                  permissions:
 *                      $ref: '#/components/schemas/Permissions_SubSchema'
*/

// Info: Update Role Schema
/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateRole:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of role
 *                  permissions:
 *                      $ref: '#/components/schemas/Permissions_SubSchema'
*/