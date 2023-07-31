// Info: Swagger Schemas:

// Info: Add Product Schema
/**
 * @swagger
 *  components:
 *      schemas:
 *          AddProduct:
 *              type: object
 *              required:
 *                  -   type
 *                  -   title
 *                  -   brief_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   count
 *                  -   gallery_images
 *              properties:
 *                  type:
 *                      type: string
 *                      enum: ['REAL_PRODUCT', 'VIRTUAL_PRODUCT']
 *                      description: type of product
 *                  title:
 *                      type: string
 *                      description: title of product
 *                  brief_text:
 *                      type: string
 *                      description: brief text description of product
 *                  text:
 *                      type: string
 *                      description: text description of product
 *                  tags:
 *                      type: array
 *                      description: the list of tags as an array
 *                  category:
 *                      type: string
 *                      description: id of category as a foreign key
 *                  supplier:
 *                      type: string
 *                      description: supplier of product
 *                  price:
 *                      type: integer
 *                      description: price of product (Rial)
 *                  discount:
 *                      type: integer
 *                      description: discount of product (Rial)
 *                  count:
 *                      type: integer
 *                      description: count of product
 *                  height:
 *                      type: integer
 *                      description: height of product (Centimeter)
 *                  width:
 *                      type: integer
 *                      description: width of product (Centimeter)
 *                  length:
 *                      type: integer
 *                      description: length of product (Centimeter)
 *                  weigth:
 *                      type: integer
 *                      description: weigth of product (Gram)
 *                  made_in:
 *                      type: string
 *                      description: Product country
 *                  colors:
 *                      type: array
 *                      items:
 *                          type: string
 *                          enum: ['Red', 'Green', 'Black', 'White', 'Blue', 'Yellow', 'Brown']
 *                      explode: false
 *                      description: Product colors
 *                  gallery_images:
 *                      type: array
 *                      items: 
 *                          type: string
 *                          format: binary
 *                      description: Gallery images of product at least one image is required
*/

// Info: Update Product Schema
/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateProduct:
 *              type: object
 *              properties:
 *                  type:
 *                      type: string
 *                      enum: ['REAL_PRODUCT', 'VIRTUAL_PRODUCT']
 *                      description: type of product
 *                  title:
 *                      type: string
 *                      description: title of product
 *                  brief_text:
 *                      type: string
 *                      description: brief text description of product
 *                  text:
 *                      type: string
 *                      description: text description of product
 *                  tags:
 *                      type: array
 *                      description: the list of tags as an array
 *                  category:
 *                      type: string
 *                      description: id of category as a foreign key
 *                  supplier:
 *                      type: string
 *                      description: supplier of product
 *                  price:
 *                      type: integer
 *                      description: price of product (Rial)
 *                  discount:
 *                      type: integer
 *                      description: discount of product (Rial)
 *                  count:
 *                      type: integer
 *                      description: count of product
 *                  height:
 *                      type: integer
 *                      description: height of product (Centimeter)
 *                  width:
 *                      type: integer
 *                      description: width of product (Centimeter)
 *                  length:
 *                      type: integer
 *                      description: length of product (Centimeter)
 *                  weigth:
 *                      type: integer
 *                      description: weigth of product (Gram)
 *                  made_in:
 *                      type: string
 *                      description: weigth of product (Gram)
 *                  colors:
 *                      type: array
 *                      items:
 *                          type: string
 *                          enum: ['Red', 'Green', 'Black', 'White', 'Blue', 'Yellow', 'Brown']
 *                      explode: false
 *                      description: weigth of product (Gram)
 *                  gallery_images:
 *                      type: array
 *                      items: 
 *                          type: string
 *                          format: binary
 *                      description: Gallery images of product at least one image is required
*/

