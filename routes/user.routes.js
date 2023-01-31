const router = require("express").Router();
const { protect, restrictTo } = require("../middlewares/authorization");
const { updateMe, getAllUsers } = require("../controller/user.controller");

/**
 *@swagger
 * /api/users/updateMe:
 *  patch:
 *      tags:
 *       - Users
 *      summary: Add a new user
 *      description: Add a new user
 *      requestBody:
 *        description: Create a new user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                 type: string
 *                 example: John Mukamba
 *                email:
 *                 type: string
 *                 example: john@email.com
 *                password:
 *                 type: string
 *                 example: '12345'
 *                confirmPassword:
 *                 type: string
 *                 example: '12345'
 *        required: true
 *      responses:
 *        '200':
 *          description: Successful operation
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
 *                       example: John Mukamba
 *                      email:
 *                       type: string
 *                       example: john@email.com
 */
router.patch("/updateMe", protect, updateMe);

/**
 * @swagger
 * /api/users:
 *  get:
 *   summary: For getting all users
 *   tags: [Users]
 *
 *   description: This is used to get all users of the application
 *
 *   responses:
 *      200:
 *       description: Returned users
 *       content:
 *        application/json:
 *         schema:
 *          type: array
 */
router.route("/").get(protect, restrictTo("admin"), getAllUsers);

module.exports = router;
