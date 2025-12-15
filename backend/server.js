require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const projectRoutes = require('./routes/projectRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount feature routes
app.use('/api/projects', projectRoutes);

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  } catch (err) {
    console.error('Unable to connect to DB', err);
    process.exit(1);
  }
}

start();
