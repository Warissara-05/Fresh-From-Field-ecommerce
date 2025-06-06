const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 2000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/register', require('./routes/register.js'));
app.use('/api/login', require('./routes/login.js'));


app.use('/api/products', require('./routes/products'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/shop.html');  // ให้ส่งไฟล์ shop.html หรือไฟล์ที่ต้องการแสดง
});


app.listen(PORT, () => {
    console.log("Server running at http://localhost:"+PORT);
})

