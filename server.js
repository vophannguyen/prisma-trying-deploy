require("dotenv").config();
const app = require("./api/app");
const init = async () => {
  // await seed();
  const PORT = process.env.URL_API;
  app.listen(PORT, () => `Listen ${PORT}`);
};
init();
