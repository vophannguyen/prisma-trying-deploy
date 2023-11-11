require("dotenv").config();
const app = require("./api/app");
const init = async () => {
  // await seed();
  const PORT = process.env.URL || 6001;
  app.listen(PORT, () => `Listen ${PORT}`);
};
init();
