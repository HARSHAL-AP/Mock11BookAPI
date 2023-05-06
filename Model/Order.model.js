const mongoose = require("mongoose");

const orderSchima = mongoose.Schema({
   
         
         user : { },
         books : [{   }],
         totalAmount: Number
   
});

const Ordermodel = mongoose.model("order", orderSchima);

module.exports = {
  Ordermodel,
};
