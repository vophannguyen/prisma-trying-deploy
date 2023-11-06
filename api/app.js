const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
module.exports = app;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("work app");
});

app.use("/auth/login", require("./auth/login"));
app.use("/auth/register", require("./auth/register"));
app.use("/api/posts", require("./post/post"));
