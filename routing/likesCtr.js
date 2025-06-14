const asyncHandler = require("express-async-handler");
const Likes = require("../schema/LikesSchema");

// POST /api/userlike
const postUserLikes = asyncHandler(async (req, res) => {
  const { userId, movieId } = req.body;
  console.log("userid: ",userId," movieID: ",movieId);
  const p = document.createElement("p");
  p.innerHTML = userId;
  console.log("post liked by user");

  // Check if both userId and movieId are provided
  if (!userId || !movieId) {
    return res.status(400).json({ message: "userId and movieId are required" });
  }

  // Check if the user has already liked the movie
  const alreadyLiked = await Likes.findOne({ userId, movieId });
  if (alreadyLiked) {
    return res.status(409).json({ message: "Movie already liked by this user" });
  }

  // Create a new like entry
  const like = await Likes.create({ userId, movieId });
  res.status(201).json(like);
});

// GET /api/getlikes?userId=... or ?movieId=...
const getUserLikes = asyncHandler(async (req, res) => {
  const { userId, movieId } = req.query;

  // Prepare filter based on query parameters
  let filter = {};
  if (userId) filter.userId = userId;
  if (movieId) filter.movieId = movieId;

  // Fetch likes and populate user and movie details
  const likes = await Likes.find(filter)
    .populate("userId", "name email")
    .populate("movieId", "name director");

  res.status(200).json(likes);
});

// DELETE /api/userlike
const deleteUserLike = asyncHandler(async (req, res) => {
  const { userId, movieId } = req.body;

  // Check if both userId and movieId are provided
  if (!userId || !movieId) {
    return res.status(400).json({ message: "userId and movieId are required" });
  }

  // Find and delete the like entry
  const like = await Likes.findOneAndDelete({ userId, movieId });

  // If like not found, return 404 error
  if (!like) {
    return res.status(404).json({ message: "Like not found" });
  }

  res.status(200).json({ message: "Like removed successfully" });
});

module.exports = {
  postUserLikes,
  getUserLikes,
  deleteUserLike,
};
