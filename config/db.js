
const { Sequelize } = require('sequelize');
require('dotenv').config

// Initialize Sequelize with MySQL database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD , {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

// Sync database
const syncDb = async () => {
  try {
    await sequelize.sync();
    console.log('Database synced!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

syncDb();

module.exports = sequelize;
