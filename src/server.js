require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/database");
require("./models/User");
const PORT = process.env.PORT || 5000;
(async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected successfully");
    await sequelize.sync();
    console.log("All models synced");
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (error) {
    console.error("Database Connection Failed", error);
  }
})();
