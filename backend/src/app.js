const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

const taskRoutes = require('./routes/task.routes');
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Project Manager Backend API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
