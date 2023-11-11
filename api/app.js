require("dotenv").config();
const serverless = require("serverless-http");
const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
module.exports.handler = serverless(app);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.get("/", (req, res) => {
//   res.send("work app");
// });
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../../public/index.html"))
);
app.get("/login.js", (req, res) =>
  res.sendFile(path.join(__dirname, "../../public/login.js"))
);
app.use("/.netlify/functions-build/auth/login", require("./auth/login"));
app.use("/auth/register", require("./auth/register"));
app.use("/api/posts", require("./post/post"));
const PORT = process.env.URL_API;
app.listen(PORT, () => `Listen ${PORT}`);
