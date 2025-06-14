
const express = require('express');
const router = express.Router();
const Movie = require('../schema/movieModel');
const ReportedMovie = require('../schema/reportedMovieSchema'); 
const UserMessage = require('../schema/Msg');

// const asyncHandler = require("express-async-handler");


// Example route for testing
router.get('/ok', async (req, res) => {
  res.send("ok working");
});

//old raj
router.get('/api/all', async (req, res) => {
  try {
    const movies = await Movie.find(); // Fetch all movies from the database
    res.status(200).json(movies); // Return movies as JSON response
  } catch (err) {
    res.status(500).json({ message: 'Error fetching movies' });
  }
});



//old raj
router.post('/api/message', async (req, res) => {
  try {
    // Trim inputs to remove unnecessary whitespace
    const title = req.body.title?.trim();
    const message = req.body.message?.trim();

    // Validate required fields after trimming
    if (!title || !message) {
      return res.status(400).json({ message: 'Title and message are required' });
    }

    // Create and save the new message
    const newMsg = new UserMessage({
      title,
      message,
    });

    const savedMessage = await newMsg.save();
    res.status(201).json({ message: 'Message posted successfully', savedMessage });
  } catch (err) {
    console.error('Error posting message:', err);
    res.status(500).json({ message: 'Error posting message' });
  }
});


// router.post('/api/posting', async (req, res) => {
//   const {name,director,rating,about,urview} = req.body;
//   console.log("name:",name);
//   console.log(req.body);
  // try {
  //   const movie = new Movie(req.body);
  //   const saved = await movie.save();
  //   res.status(201).json(saved);
  // } catch (error) {
  //   console.error("❌ Error in posting movie:", error);  // log it!
  //   res.status(500).json({ message: "Server error", details: error.message });
  // }
// });

router.post('/api/posting', async (req, res) => {
  console.log('📦 Received data from frontend:', req.body);
  try {
    const name = req.body.name;
    const director = req.body.director;
    const rating = req.body.rating;
    const genre = req.body.genre;
    const about = req.body.about;
    const urview = req.body.urview;

    // Step 3: Validate required fields
    if (!name || !director || !rating || !genre || !about || !urview) {
      console.warn('❌ Missing required fields');
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Step 4: Save movie to DB
    const newMovie = new Movie({
      name,
      director,
      rating,
      genre,
      about,
      urview,
    });

    const savedMovie = await newMovie.save();

    // Step 5: Respond back
    console.log('✅ Movie saved successfully:', savedMovie);
    res.status(201).json({ message: 'Movie posted successfully', movie: savedMovie });
  } catch (err) {
    console.error('🔥 Error saving movie:', err);
    res.status(500).json({ message: 'Error posting movie backend' });
  }
});

router.post('/api/newposting',async(req,res)=>{
  const {name,director,rating,genre,about,urview} = req.body;
  console.log(name,director,rating,genre,about,urview);
  try{
    const newMovieDetail = new Movie({
      name,director,rating,genre,about,urview
    });

    const newSavedMovie = await newMovieDetail.save();
    console.log("Movie posted successfully ",newSavedMovie);
    res.status(201).json({message:"Movie posted successfully",movie:newSavedMovie});
  }catch(error){
    console.error("Error in posting movie",error);
    res.status(500).json({message:"Error posting movie backend"});
  }
});

// Route: POST /api/posting
router.post('/api/rajposting', async (req, res) => {
  try {
    console.log('Received data from frontend:', req.body);
    res.status(200).json({ message: 'Data received successfully' });
  } catch (err) {
    console.error('Error logging data:', err);
    res.status(500).json({ message: 'Error receiving data' });
  }
});


// Route to report a movie
router.post('/api/report/:id', async (req, res) => {
  const movieId = req.params.id;
  console.log("debugging from backend checking if id reached here or not",movieId);
  try {
    // Find the movie in the Movie collection
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Remove the movie from the Movie collection
    await Movie.findByIdAndDelete(movieId);

    // Add the movie to the ReportedMovies collection
    const reportedMovie = new ReportedMovie({
      name: movie.name,
      director: movie.director,
      review: movie.review,
      rating: movie.rating,
      genre: movie.genre,
      about: movie.about,
      urview: movie.urview,
      reported: true, // Mark as reported
    });

    // Save the reported movie
    await reportedMovie.save();

    res.json({ message: 'Movie reported and moved to ReportedMovies', isReported: true });
  } catch (error) {
    console.error('Backend Error reporting movie:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;