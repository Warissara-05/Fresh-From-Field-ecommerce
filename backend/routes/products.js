const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const router = express.Router();

const dbPath = path.join(__dirname, '../data/products.db');
const db = new sqlite3.Database(dbPath);

// GET สินค้าตามหมวดหมู่ (หรือทั้งหมด)
router.get('/', (req, res) => {
  const category = req.query.category;
  let sql = "SELECT * FROM products";
  const params = [];

  if (category && category !== 'All') {
    sql += " WHERE category = ?";
    params.push(category);
  }

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST สินค้าใหม่
router.post('/', (req, res) => {
  const { name, price, discount_price, image, category } = req.body;
  db.run(
    "INSERT INTO products (name, price, discount_price, image, category) VALUES (?, ?, ?, ?, ?)",
    [name, price, discount_price, image, category],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// PUT แก้ไขสินค้า
router.put('/:id', (req, res) => {
  const { name, price, discount_price, image, category } = req.body;
  const { id } = req.params;
  db.run(
    "UPDATE products SET name = ?, price = ?, discount_price = ?, image = ?, category = ? WHERE id = ?",
    [name, price, discount_price, image, category, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// DELETE ลบสินค้า
router.delete('/:id', (req, res) => {
  db.run("DELETE FROM products WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
