const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.post('/', (req, res) => {
  const { username, password } = req.body;
  const filePath = path.join(__dirname, '../data/user.json');

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Server error reading user data.' });
    }

    let users;
    try {
      users = JSON.parse(data);
    } catch (e) {
      return res.status(500).json({ message: 'Corrupted user data.' });
    }

    const user = users.find(u => u.email === username);

    if (!user) {
      return res.status(401).json({ message: 'Incorrect Username.' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect Password.' });
    }

    return res.status(200).json({ message: 'Login successfully.' });
  });
});

module.exports = router;
