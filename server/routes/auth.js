const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');  // use promise-based API
const verifyToken = require('../middleware/authMiddleware'); // Import middleware
require('dotenv').config();

// Helper function to create a new MySQL connection
async function getConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });
}

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  let connection;
  try {
    connection = await getConnection();

    const [existing] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Username already taken.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await connection.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  } finally {
    if (connection) await connection.end();
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  let connection;
  try {
    connection = await getConnection();

    const [userResult] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
    const user = userResult[0];

    if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  } finally {
    if (connection) await connection.end();
  }
});

// GET /api/auth/users — List all users (protected)
router.get('/users', verifyToken, async (req, res) => {
  let connection;
  try {
    connection = await getConnection();

    const [users] = await connection.execute('SELECT id, username FROM users');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error retrieving users.' });
  } finally {
    if (connection) await connection.end();
  }
});

// PUT /api/auth/users/:id — Update a user’s username (protected)
router.put('/users/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username is required.' });
  }

  let connection;
  try {
    connection = await getConnection();

    await connection.execute('UPDATE users SET username = ? WHERE id = ?', [username, id]);
    res.json({ message: 'Username updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating user.' });
  } finally {
    if (connection) await connection.end();
  }
});

// DELETE /api/auth/users/:id — Delete a user (protected)
router.delete('/users/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  let connection;
  try {
    connection = await getConnection();

    await connection.execute('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting user.' });
  } finally {
    if (connection) await connection.end();
  }
});

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const db = require('../db');
// const verifyToken = require('../middleware/authMiddleware'); // ✅ Import middleware
// require('dotenv').config();

// // Register a new user
// router.post('/register', async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required.' });
//   }

//   try {
//     const [existing] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
//     if (existing.length > 0) {
//       return res.status(400).json({ message: 'Username already taken.' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
//     res.status(201).json({ message: 'User registered successfully.' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error.' });
//   }
// });

// // Login user
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required.' });
//   }

//   try {
//     const [userResult] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
//     const user = userResult[0];

//     if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

//     const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     res.json({ token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error.' });
//   }
// });


// // ✅ GET /api/auth/users — List all users (protected)
// router.get('/users', verifyToken, async (req, res) => {
//   try {
//     const [users] = await db.query('SELECT id, username FROM users');
//     res.json(users);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error retrieving users.' });
//   }
// });

// // ✅ PUT /api/auth/users/:id — Update a user’s username (protected)
// router.put('/users/:id', verifyToken, async (req, res) => {
//   const { id } = req.params;
//   const { username } = req.body;

//   if (!username) {
//     return res.status(400).json({ message: 'Username is required.' });
//   }

//   try {
//     await db.query('UPDATE users SET username = ? WHERE id = ?', [username, id]);
//     res.json({ message: 'Username updated successfully.' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error updating user.' });
//   }
// });

// // ✅ DELETE /api/auth/users/:id — Delete a user (protected)
// router.delete('/users/:id', verifyToken, async (req, res) => {
//   const { id } = req.params;

//   try {
//     await db.query('DELETE FROM users WHERE id = ?', [id]);
//     res.json({ message: 'User deleted successfully.' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error deleting user.' });
//   }
// });

// module.exports = router;