const sqlite3 = require('sqlite3').verbose();  // ใช้ sqlite3 library
const path = require('path');  // ใช้ path module

// เชื่อมต่อกับฐานข้อมูล SQLite (หากฐานข้อมูลไม่มีจะสร้างใหม่)
const db = new sqlite3.Database(path.join(__dirname, 'products.db'), (err) => {
  if (err) {
    console.error('❌ Error connecting to SQLite database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
  }
});

module.exports = db;
