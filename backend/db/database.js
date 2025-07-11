// backend/database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./products.db');

// สร้างตาราง products 
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, discount_price REAL, category TEXT, image TEXT)");
});

// เพิ่มข้อมูลสินค้า
function addProduct(name, price, discount_price, category, image) {
    const stmt = db.prepare("INSERT INTO products (name, price, discount_price, category, image) VALUES (?, ?, ?, ?, ?)");
    stmt.run(name, price, discount_price, category, image);
    stmt.finalize();
}

// แสดงข้อมูลสินค้า
function getProducts(category, callback) {
    db.all("SELECT * FROM products WHERE category = ? OR ? = 'All'", [category, category], (err, rows) => {
        if (err) {
            console.error(err);
            return callback(err, null);
        }
        callback(null, rows);
    });
}

// แก้ไขข้อมูลสินค้า
function updateProduct(id, name, price, discount_price, category, image) {
    const stmt = db.prepare("UPDATE products SET name = ?, price = ?, discount_price = ?, category = ?, image = ? WHERE id = ?");
    stmt.run(name, price, discount_price, category, image, id);
    stmt.finalize();
}

// ลบข้อมูลสินค้า
function deleteProduct(id) {
    const stmt = db.prepare("DELETE FROM products WHERE id = ?");
    stmt.run(id);
    stmt.finalize();
}

module.exports = { addProduct, getProducts, updateProduct, deleteProduct };

