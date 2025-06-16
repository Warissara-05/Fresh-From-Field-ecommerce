const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')
const fs = require('fs');


const app = express();
const PORT = 2000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..')));

app.use('/api/register', require('./routes/register.js'));
app.use('/api/login', require('./routes/login.js'));
app.use('/api/subscribe', require('./routes/subscribe.js'));
app.use('/api/products', require('./routes/products.js'));
app.use('/api/search', require('./routes/search.js'));
app.use('/api/checkout', require('./routes/checkout.js'));


/*  app.get('/', (req, res) => {
  res.sendFile(__dirname + '/shop.html');  // ให้ส่งไฟล์ shop.html หรือไฟล์ที่ต้องการแสดง
});  */


app.listen(PORT, () => {
    console.log("Server running at http://localhost:"+PORT);
})

app.get('/api/users', (req, res) => {
  const filePath = path.join(__dirname, 'data/user.json');
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error reading user data.' });

    try {
      const users = JSON.parse(data);
      res.json(users);
    } catch (e) {
      res.status(500).json({ message: 'Corrupted user data.' });
    }
  });
});
