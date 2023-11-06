const prisma = require("./index");

const seed = async () => {
  await prisma.user.create({
    data: {
      username: "nguyenvo",
      password: "741258963",
      posts: {
        create: [
          {
            title: "test",
            content: "trying to test Post table",
          },
          {
            title: "test1",
            content: "trying to test Post table 1",
          },
          {
            title: "test2",
            content: "trying to test Post table 2",
          },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      username: "nguyenvo1",
      password: "741258963",
      posts: {
        create: [
          {
            title: "test",
            content: "trying to test Post table",
          },
          {
            title: "test1",
            content: "trying to test Post table 1",
          },
          {
            title: "test2",
            content: "trying to test Post table 2",
          },
        ],
      },
    },
  });
  await prisma.user.create({
    data: {
      username: "nguyenvo2",
      password: "741258963",
      posts: {
        create: [
          {
            title: "test",
            content: "trying to test Post table",
          },
          {
            title: "test1",
            content: "trying to test Post table 1",
          },
          {
            title: "test2",
            content: "trying to test Post table 2",
          },
        ],
      },
    },
  });
};
seed();
module.exports = seed;
