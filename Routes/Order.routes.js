const express = require("express");
const { Ordermodel } = require("../Model/Order.model");
const {adminAuthorization}=require("../Middlewares/Authorization");
const {userauthorization}=require("../Middlewares/Userauthorizition")
const OrderRoute = express.Router();

OrderRoute.get("/orders",adminAuthorization, async (req, res) => {
  try {
    const data = await Ordermodel.find();
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.send("Somthing Went Wrong...");
  }
});

OrderRoute.post("/order",userauthorization, async (req, res) => {
  const order = req.body;
  try {
    const book = await new Ordermodel(order);
    await book.save();
    res.status(201).send("New Order Created  ");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Somthing Went Wrong..." });
  }
});

module.exports = {
  OrderRoute,
};
