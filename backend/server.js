const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const botRoutes = require('./routes/bots');
const creditRoutes = require('./routes/credits');
const webhookRoutes = require('./routes/webhook');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/bots', botRoutes);
app.use('/api/credits', creditRoutes);
app.use('/api/webhook', webhookRoutes);

if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../frontend/build');
  console.log('Serving static files from:', buildPath);
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'), (err) => {
      if (err) {
        console.error('Error serving index.html:', err);
        res.status(500).send('Server error');
      }
    });
  });
}

app.get('/health', (req, res) => {
  res.json({ message: 'WhatsApp bot platform backend running' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
