const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = require('./models/db');

// Ví dụ: Lấy tất cả task
async function getAllTasks() {
  const result = await pool.query('SELECT * FROM tasks');
  return result.rows;
}

module.exports = { getAllTasks };

// Lấy danh sách task, hỗ trợ lọc theo trạng thái, ngày, tag
router.get('/', async (req, res) => {
  const { status, deadline, tag, search } = req.query;
  let query = 'SELECT * FROM tasks';
  let conditions = [];
  let params = [];

  if (status) {
    conditions.push('status = $' + (params.length + 1));
    params.push(status);
  }
  if (deadline) {
    conditions.push('deadline = $' + (params.length + 1));
    params.push(deadline);
  }
  if (tag) {
    conditions.push(`tags @> ARRAY[$${params.length + 1}]::varchar[]`);
    params.push(tag);
  }
  if (search) {
    conditions.push('(title ILIKE $' + (params.length + 1) + ' OR description ILIKE $' + (params.length + 1) + ')');
    params.push('%' + search + '%');
  }
  if (conditions.length) {
    query += ' WHERE ' + conditions.join(' AND ');
  }
  query += ' ORDER BY deadline ASC';

  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Xem chi tiết task
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Task not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Thêm task
router.post('/', async (req, res) => {
  const { user_id, title, description, deadline, priority, status, tags } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO tasks (user_id, title, description, deadline, priority, status, tags) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [user_id, title, description, deadline, priority, status, tags]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sửa task
router.put('/:id', async (req, res) => {
  const { title, description, deadline, priority, status, tags } = req.body;
  try {
    const result = await pool.query(
      'UPDATE tasks SET title=$1, description=$2, deadline=$3, priority=$4, status=$5, tags=$6, updated_at=NOW() WHERE id=$7 RETURNING *',
      [title, description, deadline, priority, status, tags, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Task not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Xóa task
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Task not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
