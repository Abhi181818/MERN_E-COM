const mongoose = require("mongoose")

const prodSchema = mongoose.Schema({

  name: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: false
  },
  description: { type: String, required: false },
  ratings: { type: Number, default: 0 },
  images: [{
    public_id: {
      type: String, required: false
    },
    url: {
      type: String, required: false
    }
  }],
  category: { type: String, required: false },
  createdAt: { type: Date, default: Date.now() },
  numOfReviews: { type: Number, default: 0 },
  reviews: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: false
    },
    rating: {
      type: Number,
      required: false
    },
    comment: {
      type: String,
      required: false
    }
  }],
  stock: {
    type: Number, required: false, default: 1, maxLength: 4
  }
})

module.exports = mongoose.model('Products', prodSchema);