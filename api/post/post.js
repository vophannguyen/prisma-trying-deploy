const express = require("express");
const router = express.Router();
const prisma = require("../../prisma");
const jwt = require("jsonwebtoken");
module.exports = router;
async function token(req) {
  //i use insomnia co check
  // const token = req.body.token;
  // console.log(token);
  const token = req.headers.authorization;
  if (!token) {
    return { error: "No user", message: "need to login" };
  }
  const payload = jwt.verify(token, process.env.JWT);
  console.log(payload);
  const user = await prisma.user.findUnique({
    where: {
      id: payload.id,
    },
  });
  // console.log(user);
  return user;
}
///get all post of user
router.get("/", async (req, res, next) => {
  try {
    const user = await token(req);
    if (user.error) {
      res.json(user);
    }
    const posts = await prisma.post.findMany({
      where: {
        userId: user.id,
      },
    });

    if (posts) {
      res.json({ posts: posts });
    }
  } catch (err) {
    next(err);
  }
});
//post create new post
router.post("/", async (req, res, next) => {
  try {
    const payload = await token(req);
    if (payload.error) {
      res.json(payload);
    }
    console.log(payload.id);
    const post = await prisma.post.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        userId: payload.id,
      },
    });
    if (post) {
      res.json(post);
    }
  } catch (err) {
    next(err);
  }
});
//dele post/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const user = await token(req);
    if (user.error) {
      res.json(user);
    }
    const post = await prisma.post.deleteMany({
      where: {
        id: id,
        userId: user.id,
      },
    });
    // console.log(post);
    if (post.count > 0) {
      res.json({ message: "success", data: post });
    }
    res.json({ message: "post not found" });
  } catch (err) {
    next(err);
  }
});
//put/:ID  upate post
router.put("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const user = await token(req);
    if (user.error) {
      res.json(user);
    }
    const post = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: req.body.title,
        content: req.body.content,
      },
    });
    if (post) {
      res.json(post);
    }
  } catch (err) {
    next(err);
  }
});
//get post with id
router.get("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const user = await token(req);
    if (user.error) {
      res.json(user);
    }
    const posts = await prisma.post.findFirst({
      where: {
        userId: user.id,
        id: id,
      },
    });
    console.log(posts);
    if (posts) {
      res.json(posts);
    }
    res.json({ message: "Post not found" });
  } catch (err) {
    next(err);
  }
});
