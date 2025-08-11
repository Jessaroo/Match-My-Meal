const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const verifyToken = require('../middleware/authMiddleware');
require('dotenv').config();

// Helper to create a new DB connection
async function getConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });
}

// GET /api/favorites → get favorites for logged-in user
router.get('/', verifyToken, async (req, res) => {
  let connection;
  try {
    connection = await getConnection();

    const [rows] = await connection.execute(
      'SELECT idMeal, title, thumbnail FROM favorites WHERE user_id = ?',
      [req.user.id]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching favorites' });
  } finally {
    if (connection) await connection.end();
  }
});

// POST /api/favorites → add a favorite
router.post('/', verifyToken, async (req, res) => {
  const { idMeal, title, thumbnail } = req.body;
  if (!idMeal || !title)
    return res.status(400).json({ message: 'Missing required fields' });

  let connection;
  try {
    connection = await getConnection();

    await connection.execute(
      'INSERT INTO favorites (user_id, idMeal, title, thumbnail) VALUES (?, ?, ?, ?)',
      [req.user.id, idMeal, title, thumbnail]
    );

    res.status(201).json({ message: 'Favorite added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving favorite' });
  } finally {
    if (connection) await connection.end();
  }
});

// DELETE /api/favorites/:idMeal → delete a favorite
router.delete('/:idMeal', verifyToken, async (req, res) => {
  const { idMeal } = req.params;

  let connection;
  try {
    connection = await getConnection();

    await connection.execute(
      'DELETE FROM favorites WHERE user_id = ? AND idMeal = ?',
      [req.user.id, idMeal]
    );

    res.json({ message: 'Favorite deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting favorite' });
  } finally {
    if (connection) await connection.end();
  }
});

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const db = require('../db');
// const verifyToken = require('../middleware/authMiddleware');

// // ✅ GET /api/favorites → get favorites for logged-in user
// router.get('/', verifyToken, async (req, res) => {
//   try {
//     const [rows] = await db.query('SELECT idMeal, title, thumbnail FROM favorites WHERE user_id = ?', [req.user.id]);
//     res.json(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error fetching favorites' });
//   }
// });

// // ✅ POST /api/favorites → add a favorite
// router.post('/', verifyToken, async (req, res) => {
//   const { idMeal, title, thumbnail } = req.body;
//   if (!idMeal || !title) return res.status(400).json({ message: 'Missing required fields' });

//   try {
//     await db.query(
//       'INSERT INTO favorites (user_id, idMeal, title, thumbnail) VALUES (?, ?, ?, ?)',
//       [req.user.id, idMeal, title, thumbnail]
//     );
//     res.status(201).json({ message: 'Favorite added' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error saving favorite' });
//   }
// });

// // ✅ DELETE /api/favorites/:idMeal → delete a favorite
// router.delete('/:idMeal', verifyToken, async (req, res) => {
//   const { idMeal } = req.params;

//   try {
//     await db.query('DELETE FROM favorites WHERE user_id = ? AND idMeal = ?', [req.user.id, idMeal]);
//     res.json({ message: 'Favorite deleted' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error deleting favorite' });
//   }
// });

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const db = require('../db');
// const verifyToken = require('../middleware/authMiddleware');

// // GET /api/favorites — get all favorites for the logged-in user
// router.get('/', verifyToken, async (req, res) => {
//   try {
//     const [rows] = await db.query('SELECT * FROM favorites WHERE user_id = ?', [req.user.id]);
//     res.json(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error fetching favorites' });
//   }
// });

// // POST /api/favorites — add a new favorite
// router.post('/', verifyToken, async (req, res) => {
//   const { idMeal, strMeal, strMealThumb } = req.body;

//   if (!idMeal || !strMeal || !strMealThumb) {
//     return res.status(400).json({ message: 'Missing fields' });
//   }

//   try {
//     await db.query(
//       'INSERT INTO favorites (user_id, idMeal, strMeal, strMealThumb) VALUES (?, ?, ?, ?)',
//       [req.user.id, idMeal, strMeal, strMealThumb]
//     );
//     res.status(201).json({ message: 'Favorite added' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error adding favorite' });
//   }
// });

// // DELETE /api/favorites/:idMeal — remove a favorite
// router.delete('/:idMeal', verifyToken, async (req, res) => {
//   const { idMeal } = req.params;

//   try {
//     await db.query('DELETE FROM favorites WHERE user_id = ? AND idMeal = ?', [
//       req.user.id,
//       idMeal,
//     ]);
//     res.json({ message: 'Favorite deleted' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error deleting favorite' });
//   }
// });

// module.exports = router;