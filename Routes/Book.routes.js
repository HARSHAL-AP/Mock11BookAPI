const express = require("express");
const { Bookmodel } = require("../Model/Book.model");
const {adminAuthorization}=require("../Middlewares/Authorization");
const BookRoute = express.Router();

BookRoute.get("/", async (req, res) => {
  if (req.query.category) {
    const books = await Bookmodel.find({ category: req.query.category });
    console.log(books)
    res.status(200).send(books);
  } else if (req.query.category && req.query.author) {
    const books = await Bookmodel.find({
      category: req.query.category,
      author: req.query.author,
    });
    res.status(200).send(books);
  } else {
    const data = await Bookmodel.find();
    console.log(data)
    res.status(200).send(data);
  }
});

BookRoute.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Bookmodel.findById({ _id: id });

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.send({ msg: "Somthing Went Wrong..." });
  }
});

BookRoute.post("/",adminAuthorization, async (req, res) => {
  const newbook = req.body;
  try {
    const book = await new Bookmodel(newbook);
    await book.save();
    res.status(201).send("New Book Added To Database ");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Somthing Went Wrong..." });
  }
});


BookRoute.patch("/:id",adminAuthorization, async (req, res) => {
    const id = req.params.id;
    const update=req.body;
    try {
      const data = await Bookmodel.findByIdAndUpdate({ _id: id },update);
  
      res.status(200).send("Book Updated");
    } catch (error) {
      console.log(error);
      res.send({ msg: "Somthing Went Wrong..." });
    }
  });

  BookRoute.put("/:id",adminAuthorization, async (req, res) => {
    const id = req.params.id;
    const update=req.body;
    try {
      const data = await Bookmodel.findOneAndReplace({ _id: id },update);
  
      res.status(200).send("Book Updated");
    } catch (error) {
      console.log(error);
      res.send({ msg: "Somthing Went Wrong..." });
    }
  });
  BookRoute.delete("/:id",adminAuthorization, async (req, res) => {
    const id = req.params.id;
 
    try {
      const data = await Bookmodel.findByIdAndDelete({ _id: id });
  
      res.status(200).send("Book Removed From Database");
    } catch (error) {
      console.log(error);
      res.send({ msg: "Somthing Went Wrong..." });
    }
  });
module.exports = {
  BookRoute,
};
