const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.post('/', (req, res) => {
  const { fname, lname, email, password } = req.body;
  console.log('Content form submitted:', { fname, lname, email, password });

  const filePath = path.join(__dirname, '../data/user.json');

  let users = [];
  if (fs.existsSync(filePath)) {
    try {
      users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
      console.error("Error reading user data:", error);
      return res.status(500).json({ status: 'Error reading user data.' });
    }
  }

  const duplicateUser = users.find(user => user.email === email);
  if (duplicateUser) {
    return res.status(200).json({ status: 'This email has already been used.' });
  }

  const newUser = { fname, lname, email, password };
  users.push(newUser);

  try {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    console.log('New user saved:', newUser);
    return res.status(200).json({ status: 'Registered successfully!' });
  } catch (err) {
    console.error("Error saving user:", err);
    return res.status(500).json({ status: 'Failed to save user data.' });
  }
});

module.exports = router;
