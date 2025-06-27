// routes/checkout.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const router = express.Router();

const dbPath = path.join(__dirname, '../data/products.db');
const db = new sqlite3.Database(dbPath);

// สร้างตาราง orders หากยังไม่มี
db.run(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT,
    email TEXT,
    total_price REAL,
    items TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// บันทึกคำสั่งซื้อ
router.post('/', (req, res) => {
  const { customer_name, email, total_price, items } = req.body;

  if (!customer_name || !email || !total_price || !items) {
    return res.status(400).json({ error: "Missing order fields" });
  }

  const itemsJSON = JSON.stringify(items);

  db.run(
    "INSERT INTO orders (customer_name, email, total_price, items) VALUES (?, ?, ?, ?)",
    [customer_name, email, total_price, itemsJSON],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ order_id: this.lastID });
    }
  );
});

// ดึงรายการคำสั่งซื้อ (optional - admin ใช้ดู)
router.get('/', (req, res) => {
  db.all("SELECT * FROM orders ORDER BY created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
