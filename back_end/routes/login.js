const express = require("express");
const login = express.Router();
const bcrypt = require("bcrypt");
const authorModel = require("../models/authorModel");
const jwt = require("jsonwebtoken");


login.post("/login", async (req, res) => {
    console.log(req.body.password);
    const user = await authorModel.findOne({"email": req.body.email});

    if(!user){
        res.status(404).send({
            statusCode: 404,
            message: "email o password sono errati"
        });
        return
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if(!validPassword){
        res.status(400).send({
            statusCode: 400,
            message: "email o password sono errati"
        });
        return
    };

    //generazione token
    const token = jwt.sign({
        name: user.name,
        surname: user.surname,
        email: user.email,
        avatar: user.avatar,
        dob: user.dob
    }, process.env.JWT_SECRET, {expiresIn: "24h"});

    
    res.header("Authorization", token).status(200).send({
        statusCode: 200,
        token,
        message: "Login effettuato con successo!",
        payload: user
    })

})

module.exports = login