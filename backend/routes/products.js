const express = require('express');
const sqlite3 = require('sqlite3').verbose();  // ใช้ sqlite3 library
const path = require('path');

const router = express.Router();

// เชื่อมต่อกับฐานข้อมูล SQLite
const db = new sqlite3.Database(path.join(__dirname, '../db/products.db'), (err) => {
  if (err) {
    console.error('❌ Error connecting to SQLite database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
  }
});

// API ดึงข้อมูลสินค้าตามหมวดหมู่
router.get('/', (req, res) => {
  const category = req.query.category || 'All';  // กำหนดหมวดหมู่เริ่มต้นเป็น All
  let sql = 'SELECT * FROM products';
  const params = [];

  if (category && category !== 'All') {
    sql += ' WHERE category = ?';  // กรองข้อมูลตามหมวดหมู่ที่เลือก
    params.push(category);
  }

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);  // ส่งข้อมูลสินค้าในรูปแบบ JSON
  });
});

module.exports = router;  // ส่งออก router


