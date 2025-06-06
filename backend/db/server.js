// backend/server.js
const express = require('express');
const app = express();
const path = require('path');
const { addProduct, getProducts, updateProduct, deleteProduct } = require('./database');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../'))); // แก้ไขเส้นทางที่ static file จะสามารถเข้าถึงได้จากโปรเจกต์หลัก

// Route: ดึงข้อมูลสินค้า
app.get('/products/:category', (req, res) => {
    const category = req.params.category;
    getProducts(category, (err, products) => {
        if (err) {
            res.status(500).send("Error retrieving products.");
        } else {
            res.json(products);
        }
    });
});

// Route: เพิ่มข้อมูลสินค้า (สำหรับหน้า Admin)
app.post('/product', (req, res) => {
    const { name, price, discount_price, category, image } = req.body;
    addProduct(name, price, discount_price, category, image);
    res.status(200).send('Product added successfully');
});

// Route: แก้ไขข้อมูลสินค้า (สำหรับหน้า Admin)
app.put('/product/:id', (req, res) => {
    const { name, price, discount_price, category, image } = req.body;
    const id = req.params.id;
    updateProduct(id, name, price, discount_price, category, image);
    res.status(200).send('Product updated successfully');
});

// Route: ลบข้อมูลสินค้า (สำหรับหน้า Admin)
app.delete('/product/:id', (req, res) => {
    const id = req.params.id;
    deleteProduct(id);
    res.status(200).send('Product deleted successfully');
});

// Serve the homepage (หน้าโชว์สินค้า)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html')); // เส้นทางที่ถูกต้องสำหรับไฟล์ index.html
});

// Serve the admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin.html')); // เส้นทางที่ถูกต้องสำหรับไฟล์ admin.html
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
