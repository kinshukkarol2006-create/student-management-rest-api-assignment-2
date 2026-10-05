const express = require('express');
const studentRoutes = require('./routes/studentRoutes');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Student Management REST API',
    endpoints: {
      students: '/students',
      student: '/students/:id',
    },
  });
});

app.use('/students', studentRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Request body must contain valid JSON' });
  }
  console.error(err);
  return res.status(500).json({ error: 'Internal server error' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log('Student Management API listening at http://localhost:' + PORT);
  });
}

module.exports = app;
