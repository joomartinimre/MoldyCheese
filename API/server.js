
const app = require("./app");

require("dotenv").config();

require("./api/database/dbContext");

app.listen(process.env.PORT);