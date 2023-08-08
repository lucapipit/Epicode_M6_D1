const express = require("express");
const google = express.Router();
const passport = require("passport");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
require("dotenv").config();


google.use(
    session({
        secret: process.env.GOOGLE_SECRETKEY,
        resave: false,
        saveUninitialized: false
    })
);

google.use(passport.initialize());
google.use(passport.session());

//serializzazione e deserializzazione dell'utente

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
})

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRETKEY,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        }, (accessToken, refreshToken, profile, done) => {
            return done(null, profile)
        }
    )
)

//creazione delle rotte

google.get("/auth/google", passport.authenticate("google", { scope : ['profile', 'email'] }), (req, res) => {
    const redirectUrl = `http://localhost:3000/success?user=${encodeURIComponent(JSON.stringify(req.user))}`;
    res.redirect(redirectUrl)
});

google.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/error" }), (req, res) => {
    const { user } = req;
    console.log(req.user);

    const token = jwt.sign(user, process.env.JWT_SECRET);
    const redirectUrl = `http://localhost:3000/success?token=${encodeURIComponent(token)}`;
    res.redirect(redirectUrl)
});

google.get("/success", (req, res) => {
    res.redirect("http://localhost:3000/")
});

module.exports = google