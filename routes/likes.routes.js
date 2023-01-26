const router = require("express").Router({ mergeParams: true });

const { protect } = require("../middlewares/authorization");
const { createLike, getAllLikes } = require("../controller/like.controller");

/**
 * @swagger
 * /api/likes:
 *  get:
 *   summary: For getting all Likes
 *   tags: [Likes]
 *
 *   description: This is used to get all likes.
 *
 *   responses:
 *      200:
 *       description: Returned likes
 *       content:
 *        application/json:
 *         schema:
 *          type: array
 */
router.route("/").get(getAllLikes);

/**
 *@swagger
 * /api/likes:
 *  post:
 *      tags:
 *       - Likes
 *      summary: Create a new like
 *      description: Create a new like
 *      requestBody:
 *        description: Create a new like
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
 *                   like:
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
 */
router.route("/").post(protect, createLike);

module.exports = router;
