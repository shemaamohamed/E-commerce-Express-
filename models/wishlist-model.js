const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product', 
      },
      addedAt: { type: Date, default: Date.now }, 
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true, 
  },
}, { timestamps: true }); 

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
module.exports = Wishlist;
