const express = require("express");
const prisma = require("../../prisma");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// require("dotenv").config();
module.exports = router;
router.post("/", async (req, res, next) => {
  try {
    // const username = "nguyenvo";
    // const password = "741258963";
    const user = await prisma.user.findFirst({
      where: {
        username: req.body.username,
      },
    });
    if (user && bcrypt.compare(req.body.password, user.password)) {
      console.log(user.id);
      const token = jwt.sign({ id: user.id }, process.env.JWT);
      console.log(token);
      res.json({
        token: token,
      });
    }
    res.json({ message: "invalid password or username" });
  } catch (err) {
    next(err);
  }
});
