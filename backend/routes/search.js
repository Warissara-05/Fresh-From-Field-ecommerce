// routes/search.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const router = express.Router();

const dbPath = path.join(__dirname, '../data/products.db');
const db = new sqlite3.Database(dbPath);

// ค้นหาสินค้าจากชื่อหรือหมวดหมู่
router.get('/', (req, res) => {
  const { q } = req.query; // คำค้นหา
  if (!q) return res.status(400).json({ error: "Missing search query" });

  const query = `%${q}%`;
  db.all(
    "SELECT * FROM products WHERE name LIKE ? OR category LIKE ?",
    [query, query],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

module.exports = router;
