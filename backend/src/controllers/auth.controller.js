const pool = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password, email } = req.body;
  console.log({ username, email, password }); // debug
  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin.' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, password, email, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email',
      [username, hashedPassword, email, 'user']
    );
    res.status(201).json({ user: result.rows[0], message: 'Đăng ký thành công!' });
  } catch (error) { 
    console.error(error);
    if (error.code === '23505') {
      res.status(409).json({ message: 'Tên đăng nhập hoặc email đã tồn tại.' });
    } else {
      res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
  }
};

exports.login = async (req, res) => {
  const { identifier, password } = req.body;
  try {
    console.log("req.body:", req.body);
    const userRes = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $1', [identifier]);

    const user = userRes.rows[0];
    console.log(user); // debug
    if (!user) return res.status(401).json({ error: 'Username hoặc Email không tồn tại' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Sai mật khẩu' });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      'your_jwt_secret',
      { expiresIn: '1d' }
    );
    res.json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};