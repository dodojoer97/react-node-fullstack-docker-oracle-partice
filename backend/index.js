// backend/index.js
import express from 'express';
import dotenv from 'dotenv';
import { pool } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/items', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM items');
    res.json(rows);
  } catch (err) {
    console.error('❌ DB query failed:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
