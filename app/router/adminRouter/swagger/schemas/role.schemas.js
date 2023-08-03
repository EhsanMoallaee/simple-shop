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
 *                  description:
 *                      type: string
 *                      description: description of role
 *                  permissions:
 *                      type: array
 *                      description: Permission id for this role
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
 *                  description:
 *                      type: string
 *                      description: title of role
 *                  permissions:
 *                      type: array
 *                      description: Permission id for this role
*/