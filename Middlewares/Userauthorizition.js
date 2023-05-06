var jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

const userauthorization = (req, res, next) => {
  const token = req.headers.authorization;
  
    if (token) {
      const decode = jwt.verify(token, process.env.KEY);
      if (decode) {
        const userid = decode.userId;
        if (userid) {
          next();
        } else {
          return res.status(401).send("Unauthorize acsess....");
        }
      } else {
        return res.status(401).send("Unauthorize acsess....");
      }
    }
  };
  
  module.exports = {
    userauthorization,
  };
  