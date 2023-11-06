const express = require("express");
const prisma = require("../../prisma");
const router = express.Router();
const jwt = require("jsonwebtoken");
// require("dotenv").config();
module.exports = router;
router.post("/", async (req, res, next) => {
  try {
    const username = "nguyenvo";
    const password = "741258963";
    const user = await prisma.user.findFirst({
      where: {
        username: req.body.username,
        password: req.body.password,
      },
    });
    if (user) {
      console.log(user.id);
      const token = jwt.sign({ id: user.id }, process.env.JWT);
      console.log(token);
      res.json({ token });
    }
    res.json({ message: "invalid password or username" });
  } catch (err) {
    next(err);
  }
});
