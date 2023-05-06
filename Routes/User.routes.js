const express = require("express");
const { Usermodel } = require("../Model/User.model");
var jwt = require("jsonwebtoken");
const UserRoute = express.Router();
require("dotenv").config();
const bcrypt = require("bcrypt");

UserRoute.post("/api/register", async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  const user = await Usermodel.find({ email: email });
  if (user.length > 0) {
    res.send(
      "User With this Email Allready Exist Pleaser Login to continew ..."
    );
  } else {
    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          console.log(err);
          res.send(
            "Unable To Register at this moment Please try again somtime..."
          );
        } else {
          const newuser = new Usermodel({
            name,
            email,
            password: hash,
            isAdmin,
          });
          await newuser.save();
          res.status(201).send("User Registed Sucsessfully...");
        }
      });
    } catch (error) {
      console.log(error);
      res.send("Somthing Wend Wrong...");
    }
  }
});

UserRoute.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Usermodel.find({ email });
    const hashpass = user[0].password;
    if (user.length > 0) {
      bcrypt.compare(password, hashpass, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userId: user[0]._id, isAdmin: user[0].isAdmin },
            process.env.KEY
          );
          res.status(201).send({ token: token, msg: "Login Sucsessfull..." });
        } else {
          res.send("Incorect Password....");
        }
      });
    } else {
      res.send("User Not Exist....Please Register Before Login");
    }
  } catch (error) {
    console.log(error);
    res.send("Unable To Connect please Try again leater...");
  }
});

module.exports = {
  UserRoute,
};


//{
//  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDU2MTM0M2Q4ZTYyZDg2ZDA0MzA5NjQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODMzNjI2Mzd9.tHFg1QGJfh2SKhhVJupt7yNZ03XrIB0HZIyt1DiL5j0",
//  "msg": "Login Sucsessfull..."
//}