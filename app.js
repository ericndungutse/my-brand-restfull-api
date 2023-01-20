const express = require("express");
const blogsRouter = require("./routes/blogs.routes");

const app = express();
app.use(express.json());

app.use("/api/blogs", blogsRouter);

module.exports = app;
