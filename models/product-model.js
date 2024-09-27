const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const productSchema = new Schema({
  name:{type:String,required:true},description: String,
  price: {type:String,required:true},
  category: {type:String,required:true},
  brand: String,
});

const product = mongoose.model("Product", productSchema);
module.exports = product;
