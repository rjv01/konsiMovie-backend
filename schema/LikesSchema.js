const mongoose = require('mongoose');

const LikesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  }
}, { timestamps: true });

const UserLikes = mongoose.model('UserLikes', LikesSchema);
console.log("Likes model is working");

module.exports = UserLikes;
