const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const productSchema = new Schema({
  username:{type:String,required:true},
  email:{type:String,required:true,unique:true} ,
  password: {type:String,required:true},
  
});

const user = mongoose.model("User", productSchema);
module.exports = user;
