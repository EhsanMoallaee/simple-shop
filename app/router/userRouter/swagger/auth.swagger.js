/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: user mobile number to get otp for signin/signup
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile    
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: user mobile number to get otp for signin/signup
 *                  code:
 *                      type: string
 *                      description: The code which recieved by user
 *          RefreshToken:
 *              type: object
 *              required:
 *                  -   refreshToken
 *              properties:
 *                  refreshToken:
 *                      type: string
 *                      description: Enter refresh token to get new access token and refresh token
 */


/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication
 */
/**
 * @swagger
 *  /user/get-otp:
 *      post:
 *          tags: [Authentication]
 *          summary: get-otp Page
 *          description: OTP get-otp
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
 *          responses: 
 *              201:
 *                  description: Successfull get-otp
 *              400: 
 *                  description: Bad request
 *              401: 
 *                  description: get-otp failed - UnAuthenticated
 *              500: 
 *                  description: Internal server error
 *
 */

/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          tags: [Authentication]
 *          summary: check-otp value
 *          description: check and validate otp code (via sms and code expire is 2 min)
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
 *          responses: 
 *              201:
 *                  description: Successfull get-otp
 *              400: 
 *                  description: Bad request
 *              401: 
 *                  description: get-otp failed - UnAuthenticated
 *              500: 
 *                  description: Internal server error
 *
 *      
 */

/**
 * @swagger
 * /user/refresh-token:
 *  post:
 *      tags: [Authentication]
 *      summary: Send refresh token to recieve new refresh token and access token
 *      description: New refresh token
 *      requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
 *      responses:
 *          200:
 *              description: Success
 */