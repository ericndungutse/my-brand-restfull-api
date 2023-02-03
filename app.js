const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

const blogsRouter = require("./routes/blogs.routes");
const authRouter = require("./routes/auth.routes");
const messageRouter = require("./routes/message.routes");
const userRouter = require("./routes/user.routes");
const commentRouter = require("./routes/comment.routes");
const likeRouter = require("./routes/likes.routes");
const globalErrHandler = require("./controller/err.controller");
const AppError = require("./utils/AppError");

const app = express();

app.use(cors());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "eric-potofolio",
      version: "1.0.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",

      contact: {
        name: "Eric Ndungutse",
        email: "dav.ndungutse@email.com",
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerformat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);
app.use("/api/comments", commentRouter);
app.use("/api/likes", likeRouter);

app.use("*", (req, res, next) => {
  return next(
    new AppError(`Cannot find "${req.originalUrl}" on this server`, 404)
  );
});

app.use(globalErrHandler);

module.exports = app;
