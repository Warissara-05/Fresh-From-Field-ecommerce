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

app.listen(PORT, () => {
    console.log("Server running at http://localhost:"+PORT);
})

