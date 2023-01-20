const express = require("express");
const blogsRouter = require("./routes/blogs.routes");

const app = express();

app.use("/blogs", blogsRouter);

module.exports = app;
