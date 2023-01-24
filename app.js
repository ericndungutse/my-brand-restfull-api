const express = require("express");
const blogsRouter = require("./routes/blogs.routes");
const authRouter = require("./routes/auth.routes");
const messageRouter = require("./routes/message.routes");
const userRouter = require("./routes/user.routes");
const commentRouter = require("./routes/comment.routes");
const likeRouter = require("./routes/likes.routes");
const globalErrHandler = require("./controller/err.controller");
const AppError = require("./utils/AppError");

const app = express();
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
