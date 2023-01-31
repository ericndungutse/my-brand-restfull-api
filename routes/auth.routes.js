const router = require("express").Router();

const { signin, signup } = require("../controller/auth.controller");

// Signup

/**
 *@swagger
 * /api/auth/signup:
 *  post:
 *      tags:
 *       - Authentication
 *      summary: Signup
 *      description: Signup
 *      requestBody:
 *        description: Signup
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                 type: string
 *                 example: Joe Doe
 *                email:
 *                 type: string
 *                 example: doe@example.com
 *                password:
 *                 type: string
 *                 example: test12345
 *                confirmPassword:
 *                 type: string
 *                 example: test1235
 *        required: true
 *      responses:
 *        '201':
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                 status:
 *                  type: string
 *                  example: success
 *                 data:
 *                  type: object
 *                  properties:
 *                   user:
 *                    type: object
 *                    properties:
 *                      _id:
 *                       type: string
 *                       example: 4h67dsbew7wbre87
 *                      name:
 *                       type: string
 *                       example: Joe Doe
 *                      email:
 *                       type: string
 *                       example: joe@example.com
 *                      photo:
 *                       type: string
 *                       example: '/path/photo.jpg'
 */
router.route("/signup").post(signup);

// Login

/**
 *@swagger
 * /api/auth/login:
 *  post:
 *      tags:
 *       - Authentication
 *      summary: Signin
 *      description: Signin
 *      requestBody:
 *        description: Signin
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                 type: string
 *                 example: doe@example.com
 *                password:
 *                 type: string
 *                 example: test12345
 *        required: true
 *      responses:
 *        '200':
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *               type: object
 *               properties:
 *                 status:
 *                  type: string
 *                  example: success
 *                 token:
 *                  type: string
 *                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2Q5YzE4MGI3ZTE3ZTEyNDI0ZGUzOGYiLCJpYXQiOjE2NzUyMTUyMzMsImV4cCI6MTY4Mjk5MTIzM30.9opeM8y2aUeJAsxkjeK4lZsaLVDrQLDPYgn_1noj400'
 *                  data:
 *                   type: object
 *                   properties:
 *                    user:
 *                     type: object
 *                     properties:
 *                       _id:
 *                        type: string
 *                        example: 4h67dsbew7wbre87
 *                       name:
 *                        type: string
 *                        example: Joe Doe
 *                       email:
 *                        type: string
 *                        example: joe@example.com
 *                       photo:
 *                        type: string
 *                        example: '/path/photo.jpg'
 */

router.post("/login", signin);

// Signout
// router.get("/signout", protect, signout);

module.exports = router;
