const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/', (req, res) => {
  const { email } = req.body;
  const subscribe = { subscribeAt: new Date(), email };

  const filePath = path.join(__dirname, "..", "data", "subscribe.json");
  let subscribes = [];

  if (fs.existsSync(filePath)) {
    let data = fs.readFileSync(filePath, "utf-8");
    try {
      subscribes = JSON.parse(data);
      if (!Array.isArray(subscribes)) {
        subscribes = [];
      }
    } catch (e) {
      subscribes = [];
    }
    subscribes.push(subscribe);
    fs.writeFileSync(filePath, JSON.stringify(subscribes, null, 2));
    res.status(200).json({ message: 'Email Received', subscribe });
  } else {
    // สร้างไฟล์ใหม่โดยเก็บข้อมูลเป็น array ที่มี object ตัวแรก
    fs.writeFileSync(filePath, JSON.stringify([subscribe], null, 2));
    res.status(200).json({ message: 'Email Received', subscribe });
  }
});

module.exports = router;