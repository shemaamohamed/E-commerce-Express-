const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const cartSchema = new Schema({
    items: [
        {
          product: {type: Schema.Types.ObjectId,ref: 'Product',},
          quantity: {type: Number,required: true,default: 1,}
        },
      ],
      user: {type: Schema.Types.ObjectId,ref: 'User',required: true,},
});

const cart = mongoose.model("Cart", cartSchema);
module.exports = cart;
