const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./api/routes/AuthRoutes");
require("dotenv").config();

const app = require("./app");

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

require("./api/database/dbContext");

app.listen(process.env.PORT);