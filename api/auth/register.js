const express = require("express");
const router = express.Router();
const prisma = require("../../prisma");
const jwt = require("jsonwebtoken");
module.exports = router;

router.post("/", async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      res.json({ message: "need username and password" });
    }
    const username = await prisma.user.findFirst({
      where: {
        username: req.body.username,
      },
    });
    if (username) {
      res.json({ message: "invalid username" });
    }
    ///
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: req.body.password,
      },
    });
    if (user) {
      res.json({ token: jwt.sign({ id: user.id }, process.env.JWT) });
    }
  } catch (err) {
    next(err);
  }
});
