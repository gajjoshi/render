const express = require('express');
const mongoose = require('mongoose');
const next = require('next');
require('dotenv').config();  // Ensure this line is included to load environment variables

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

app.prepare().then(() => {
  const server = express();

  server.get('/validate/:password', async (req, res) => {
    const Admin = require('./models/userModel');
    try {
      const admin = await Admin.findOne({ password: req.params.password });
      if (admin) {
        res.json(admin);
      } else {
        res.status(404).send('No matching admin found');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
