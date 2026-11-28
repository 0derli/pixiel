const express = require('express');
const path = require('path');
const cors = require('cors');

const initDatabase = require('./models/initDatabase');
const apiRouter = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initDatabase();

app.use('/api', apiRouter);

const publicDir = path.join(__dirname, '..');
app.use(express.static(publicDir));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Сервер: http://localhost:${PORT}`);
});