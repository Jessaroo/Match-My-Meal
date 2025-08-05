const dotenv = require('dotenv'); // 1st, require dotenv
dotenv.config();                 // 2nd, load .env

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const favoriteRoutes = require('./routes/favorites');
require('./db'); // This triggers the connection ONCE

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API is working!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});