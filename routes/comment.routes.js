const router = require("express").Router({ mergeParams: true });

const { protect } = require("../middlewares/authorization");
const {
  createComment,
  getAllComments,
} = require("../controller/comments.controller");

/**
 * @swagger
 * /api/comments:
 *  get:
 *   summary: For getting all comments
 *   tags: [Comment]
 *
 *   description: This is used to get all comments.
 *
 *   responses:
 *      200:
 *       description: Returned comments
 *       content:
 *        application/json:
 *         schema:
 *          type: array
 */
router.route("/").get(getAllComments);

/**
 *@swagger
 * /api/comments:
 *  post:
 *      tags:
 *       - Comment
 *      summary: Create a new comment
 *      description: Create a new comment
 *      requestBody:
 *        description: Create a new comment
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                 type: string
 *                 example: 4h67dsbew7wbre87
 *                blog:
 *                 type: string
 *                 example: 4h67dsbew7wbre87
 *                comment:
 *                 type: string
 *                 example: comment one
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
 *                   comment:
 *                    type: object
 *                    properties:
 *                      _id:
 *                       type: string
 *                       example: 4h67dsbew7wbre87
 *                      user:
 *                       type: string
 *                       example: 4h67dsbew7wbre87
 *                      blog:
 *                       type: string
 *                       example: 4h67dsbew7wbre87
 *                      comment:
 *                       type: string
 *                       example: comment text
 */
router.route("/").post(protect, createComment);

module.exports = router;
