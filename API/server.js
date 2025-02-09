const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./api/routes/AuthRoutes");
require("dotenv").config();


const cors = require('cors');

// Alapértelmezett CORS szabályok engedélyezése

const app = require("./app");
app.use(cors({
    origin: 'http://localhost:5173', // A frontend címe
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Engedélyezett HTTP-módszerek
    credentials: true, // Ha szükségesek a hitelesítési adatok (pl. cookie-k)
}));

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

require("./api/database/dbContext");

app.listen(process.env.PORT);