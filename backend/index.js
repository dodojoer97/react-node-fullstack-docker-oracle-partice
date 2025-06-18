// backend/index.js
require("dotenv").config(); // Load variables from .env

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

app.get("/api/items", (req, res) => {
  res.json([
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Orange" },
  ]);
});

app.get("/api/key", (req, res) => {
  res.json({ apiKey: API_KEY });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
  console.log(`🔑 API key: ${API_KEY}`);
});
