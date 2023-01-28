const router = require("express").Router();
const { protect } = require("../middlewares/authorization");
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blogs.controller");

const commentRouter = require("../routes/comment.routes");
const likeRouter = require("../routes/likes.routes");

// Get Blogs Comments
/**
 * @swagger
 * /api/blogs/{blogId}/comments:
 *  get:
 *   summary: Get blogs comments by blog ID
 *   tags: [Blogs]
 *   parameters:
 *    - in: path
 *      name: blogId
 *      schema:
 *        type: string
 *      required: true
 *      description: alphanumerical ID of the blog to get
 *
 *   description: Get blogs comments by blog ID.
 *
 *   responses:
 *      200:
 *       description: Returned blog
 *       content:
 *        application/json:
 *         schema:
 *          type: array
 */
router.use("/:blogId/comments", commentRouter);

// Get Blogs Comments
/**
 * @swagger
 * /api/blogs/{blogId}/likes:
 *  get:
 *   summary: Get blogs likes by blog ID
 *   tags: [Blogs]
 *   parameters:
 *    - in: path
 *      name: blogId
 *      schema:
 *        type: string
 *      required: true
 *      description: alphanumerical ID of the blog to get
 *
 *   description: Get blogs likes by blog ID.
 *
 *   responses:
 *      200:
 *       description: Returned blog
 *       content:
 *        application/json:
 *         schema:
 *          type: array
 */
router.use("/:blogId/likes", likeRouter);

/**
 * @swagger
 * /api/blogs:
 *  get:
 *   summary: For getting all blogs
 *   tags: [Blogs]
 *
 *   description: This is used to get all blogs of the application
 *
 *   responses:
 *      200:
 *       description: Returned blogs
 *       content:
 *        application/json:
 *         schema:
 *          type: array
 */
router.route("/").get(getBlogs);

/**
 *@swagger
 * /api/blogs:
 *  post:
 *      tags:
 *       - Blogs
 *      summary: Create a new blog
 *      description: Create a new blog
 *      requestBody:
 *        description: Create a new blog
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                 type: string
 *                 example: CSS Selectors
 *                text:
 *                 type: string
 *                 example: Blog text content
 *                image:
 *                 type: string
 *                 example: '/path/a.jpg'
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
 *                   blog:
 *                    type: object
 *                    properties:
 *                      _id:
 *                       type: string
 *                       example: 4h67dsbew7wbre87
 *                      title:
 *                       type: string
 *                       example: CSS Selectors
 *                      text:
 *                       type: string
 *                       example: CSS Selectors
 *                      image:
 *                       type: string
 *                       example: '/path/a.jpg'
 */
router.route("/").post(protect, createBlog);

/**
 * @swagger
 * /api/blogs/{blogId}:
 *  get:
 *   summary: Get blog by ID
 *   tags: [Blogs]
 *   parameters:
 *    - in: path
 *      name: blogId
 *      schema:
 *        type: string
 *      required: true
 *      description: alphanumerical ID of the blog to get
 * 
 *   description: This is used to get single blog by its ID.
 *
 *   responses:
 *      200:
 *       description: Returned blog
 *       content:
 *        application/json:
 *         schema:
 *          type: object

 */
router.route("/:blogId").get(getBlog);

/**
 *@swagger
 * /api/blogs/{blogId}:
 *  patch:
 *      tags:
 *       - Blogs
 *      summary: Update blog by ID
 *      description: Update blog by ID
 *
 *      parameters:
 *       - in: path
 *         name: blogId
 *         schema:
 *           type: string
 *
 *         required: true
 *         description: alphanumerical ID of the blog to get
 *
 *      requestBody:
 *        description: Update blog by ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                 type: string
 *                 example: CSS Selectors
 *                text:
 *                 type: string
 *                 example: Blog text content
 *                image:
 *                 type: string
 *                 example: '/path/a.jpg'
 *        required: true
 *      responses:
 *        '200':
 *          description: Success operation
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
 *                   blog:
 *                    type: object
 *                    properties:
 *                      _id:
 *                       type: string
 *                       example: 4h67dsbew7wbre87
 *                      title:
 *                       type: string
 *                       example: CSS Selectors
 *                      text:
 *                       type: string
 *                       example: CSS Selectors
 *                      image:
 *                       type: string
 *                       example: '/path/a.jpg'
 */
router.route("/:blogId").patch(updateBlog);

/**
 * @swagger
 * /api/blogs/{blogId}:
 *  delete:
 *   summary: Delete blog by ID
 *   tags: [Blogs]
 *   parameters:
 *    - in: path
 *      name: blogId
 *      schema:
 *        type: string
 *      required: true
 *      description: alphanumerical ID of the blog to get
 *
 *   description: This is used to delete single blog by its ID.
 *
 *   responses:
 *      204:
 *       description: Successful operation
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 */
router.route("/:blogId").delete(deleteBlog);

module.exports = router;
