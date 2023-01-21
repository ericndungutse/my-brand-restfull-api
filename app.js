const express = require("express");
const blogsRouter = require("./routes/blogs.routes");
const authRouter = require("./routes/auth.routes");

const app = express();
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/auth", authRouter);

module.exports = app;
