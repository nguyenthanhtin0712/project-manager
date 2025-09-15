const express = require('express');
const router = express.Router();
const pool = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Đăng nhập
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $1', [identifier]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "hehehehe" });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Sai mật khẩu" });
    }

    const token = jwt.sign({ id: user.id }, "SECRET_KEY", { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


// Đăng ký người dùng mới
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin.' });
  }
  try {
    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    // Thêm người dùng vào DB
    const result = await pool.query(
      'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email',
      [username, email, hashedPassword, 'user']
    );
    res.status(201).json({ user: result.rows[0], message: 'Đăng ký thành công!' });
  } catch (err) {
    if (err.code === '23505') {
      res.status(409).json({ message: 'Tên đăng nhập hoặc email đã tồn tại.' });
    } else {
      res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
  }
});


module.exports = router;