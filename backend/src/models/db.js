const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'project_manager_db',
  password: 'admin',
  port: 5432,
});


// Kiểm tra kết nối khi khởi động
pool.connect((err, client, release) => {
  if (err) {
    console.error('Kết nối Postgres thất bại:', err.stack);
  } else {
    console.log('Kết nối Postgres thành công!');
    release();
  }
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Query lỗi:', err);
  } else {
    console.log('Kết nối OK, thời gian hiện tại từ DB:', res.rows[0]);
  }
});


module.exports = pool;