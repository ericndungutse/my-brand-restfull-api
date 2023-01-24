const express = require("express");
const blogsRouter = require("./routes/blogs.routes");
const authRouter = require("./routes/auth.routes");
const messageRouter = require("./routes/message.routes");
const userRouter = require("./routes/user.routes");
const globalErrHandler = require("./controller/err.controller");

const app = express();
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);

app.use("*", (req, res) => {
  res.status(400).json({
    status: "fail",
    message: `Cannot find "${req.originalUrl}" on this server`,
  });
});

app.use(globalErrHandler);

module.exports = app;
