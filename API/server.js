const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./api/routes/AuthRoutes");
const commentRoutes = require("./api/routes/CommentRoutes");
const ratingRoutes = require("./api/routes/RatingRoutes");
const placeRoutes = require("./api/routes/PlaceRoutes");
const MainPageRoutes = require("./api/routes/MainPageRoutes");
const RoleRequestRoutes = require("./api/routes/RoleRequestRoutes");
const RoleRoutes = require("./api/routes/RoleRoutes");
const PlaceViewRoutes = require("./api/routes/PlaceViewRoutes")
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
app.use("/api/comment",commentRoutes)
app.use("/api/rating", ratingRoutes);
app.use("/api/place", placeRoutes)
app.use("/api/request", RoleRequestRoutes)
app.use("/api/main", MainPageRoutes)
app.use("/api/role", RoleRoutes)
app.use("/api/placeview", PlaceViewRoutes)

require("./api/database/dbContext");

app.listen(process.env.PORT);