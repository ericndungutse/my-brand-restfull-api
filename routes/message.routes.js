const router = require("express").Router();

const {
  createMessage,
  getMessages,
  getMessage,
} = require("../controller/messages.controller");
const { protect, restrictTo } = require("../middlewares/authorization");

/**
 *@swagger
 * /api/messages:
 *  post:
 *      tags:
 *       - Messages
 *      summary: Create a new message
 *      description: Create a new message
 *      requestBody:
 *        description: Create a new message
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
 *                 example: 'name@example.com'
 *                message:
 *                 type: string
 *                 example: 'Message'
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
 *                      name:
 *                       type: string
 *                       example: Eric Ndungutse
 *                      email:
 *                       type: string
 *                       example: 'name@example.com'
 *                      message:
 *                       type: string
 *                       example: Message
 */
router.route("/").post(createMessage);
router.use(protect);
/**d
 * @swagger
 * /api/messages:
 *  get:
 *   summary: For getting all messages
 *   tags: [Messages]
 *
 *   description: This is used to get all messages.
 *
 *   responses:
 *      200:
 *       description: Returned messages
 *       content:
 *        application/json:
 *         schema:
 *          type: array
 */
router.route("/").get(restrictTo("sdmin"), getMessages);

/**
 * @swagger
 * /api/messages/{id}:
 *  get:
 *   summary: Get message by ID
 *   tags: [Messages]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *        required: true
 *      description: alphanumerical ID of the message to get
 * 
 *   description: This is used to get single message by its ID.
 *
 *   responses:
 *      200:
 *       description: Returned message
 *       content:
 *        application/json:
 *         schema:
 *          type: object

 */
router.route("/:id").get(restrictTo("admin"), getMessage);

module.exports = router;
