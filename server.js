// old raj
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');

// 🔌 Load env variables and DB connection
dotenv.config();
require('./connection/condb');

// ✅ Import routes (not controllers directly)
const movieCtr = require('./routing/movieCtr');
const userRoute = require('./routes/userRoute');
const likesRoute = require('./routes/likesRoute');

const PORT = process.env.PORT || 5000;

// ✅ Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(cookieParser());

// ✅ Routes
app.use('/movies', movieCtr);
app.use('/users', userRoute);
app.use('/likes', likesRoute);

// ✅ Test route
app.get('/oko', (req, res) => {
  res.send('Konsi-Movie Backend is running raj');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

// // //'/movies' prefix
// // app.use('/movies', routei);
// // app.use('/users', userRoute);

// // app.get('/oko', (req, res) => {
// //     res.send('Konsi-Movie Backend is running raj');
// // });

// // app.listen(PORT, () => {
// //     console.log(`Server is running on http://localhost:${PORT}`);
// // });



// //new raj
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const path = require('path');
// const cookieParser = require('cookie-parser');

// const movieCtr = require('./routing/movieCtr');      // Movies route
// const userRoute = require('./routes/userRoute');    // User route
// const likeRoute = require('./routes/likesRoute');

// require('./connection/condb');  // MongoDB connection

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.urlencoded({ extended: true }));

// // Middleware
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   express.urlencoded({
//     extended: false,
//   })
// );
// app.use(bodyParser.json());

// app.use(
//   cors({
//     origin: ['https://konsi-movies.vercel.app'],
//     // origin: ['http://localhost:5173','https://konsi-movies.vercel.app'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
//   })
// );

// // Route middleware
// app.use('/movies', movieCtr);
// app.use('/users', userRoute);
// app.use('/likes',likeRoute);


// // Default route
// app.get('/oko', (req, res) => {
//   res.send('Konsi-Movie Backend is running raj');
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });



//new raj

// const express = require('express');
// const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');

// // Routes
// const movieCtr = require('./routing/movieCtr');
// const userRoute = require('./routes/userRoute');
// const likeRoute = require('./routes/likesRoute');

// // DB connection
// require('dotenv').config();
// require('./connection/condb');  

// const app = express();
// const PORT = process.env.PORT || 5000;

// // ✅ Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // ✅ CORS setup
// app.use(
//   cors({
//     origin: ['https://konsi-movies.vercel.app'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
//   })
// );

// // ✅ Routes
// app.use('/movies', movieCtr);
// app.use('/users', userRoute);
// app.use('/likes', likeRoute);

// // ✅ Test route
// app.get('/oko', (req, res) => {
//   res.send('Konsi-Movie Backend is running raj');
// });

// // ✅ Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on http://localhost:${PORT}`);
// });

// // working urls 
// //GET ALL MOVIES http://localhost:3000/movies/api/all
// //POST posting http://localhost:3000/movies/api/posting
// //POST report http://localhost:3000/movies/api/report/${movieId}
// //PUST update ​http://localhost:3000/movies/api/update/${movieID}
// //DELETE delete ​http://localhost:3000/movies/api/delete/${movieID}