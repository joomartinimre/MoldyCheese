const express = require("express");

const app = express();

app.use(express.json());

const Login_reg = require("./router");
app.use("/", Login_reg);

app.use(express.urlencoded({extended: true}));


module.exports = app;