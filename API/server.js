const express = require("express");
const path = require('path');
const db = require("./api/database/dbContext");
const bodyParser = require("body-parser");
const authRoutes = require("./api/routes/AuthRoutes");
const commentRoutes = require("./api/routes/CommentRoutes");
const ratingRoutes = require("./api/routes/RatingRoutes");
const placeRoutes = require("./api/routes/PlaceRoutes");
const MainPageRoutes = require("./api/routes/MainPageRoutes");
const RoleRequestRoutes = require("./api/routes/RoleRequestRoutes");
const RoleRoutes = require("./api/routes/RoleRoutes");
const PlaceViewRoutes = require("./api/routes/PlaceViewRoutes")
const PlaceDetailRoutes = require("./api/routes/PlaceDetailRoutes")
const SearchRoutes = require("./api/routes/SearchRoutes")
const PlaceLikeRoutes = require("./api/routes/placeLikeRoutes")
const CommentLikeRoutes = require("./api/routes/commentLikeRoutes")
const ProfilePageRoutes = require("./api/routes/ProfilePageRoutes")
require("dotenv").config();


const cors = require('cors');

// Alapértelmezett CORS szabályok engedélyezése

const app = require("./app");
app.use(cors({
    origin: 'http://localhost:5173', // A frontend címe
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Engedélyezett HTTP-módszerek
    credentials: true, // Ha szükségesek a hitelesítési adatok (pl. cookie-k)
}));

app.use('/api/user/image', express.static(path.join(__dirname, 'api', 'uploads')));

app.get('/api/user/image/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id);
    if (!user || !user.ProfilePicture) {
      return res.redirect('/api/user/image/defaultPP.jpg');
    }
  
    res.set('Content-Type', 'image/jpeg'); // vagy png, ha az
    res.send(user.ProfilePicture);
  });

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/comment",commentRoutes)
app.use("/api/rating", ratingRoutes);
app.use("/api/place", placeRoutes)
app.use("/api/request", RoleRequestRoutes)
app.use("/api/main", MainPageRoutes)
app.use("/api/role", RoleRoutes)
app.use("/api/placeview", PlaceViewRoutes)
app.use("/api/placedetail", PlaceDetailRoutes)
app.use("/api/search", SearchRoutes)
app.use("/api/c", CommentLikeRoutes)
app.use("/api/p", PlaceLikeRoutes)
app.use("/api/profile", ProfilePageRoutes)

require("./api/database/dbContext");

app.listen(process.env.PORT);