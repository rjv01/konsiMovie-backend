const express = require("express");
const router = express.Router();

const {
    postUserLikes,  
    getUserLikes,
    deleteUserLike,
} = require("../routing/likesCtr");

router.post("/api/userlike", postUserLikes);           // Like a movie
router.get("/api/getlikes", getUserLikes);             // Get likes
router.delete("/api/userlike", deleteUserLike);        // Dislike (unlike)




module.exports = router;
