const { PrismaClient } = require("../src/generated/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient().$extends({
  query: {
    user: {
      async create({ args, query }) {
        args.data.password = await bcrypt.hash(args.data.password, 14);
        return query(args);
      },
    },
  },
});

module.exports = prisma;
