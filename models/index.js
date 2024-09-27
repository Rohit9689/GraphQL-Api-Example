const sequelize = require('../config/db')
const Book = require('./book')
const Review = require('./review')



// Define associations
Book.hasMany(Review, { foreignKey: 'bookId', as: 'reviews' });
Review.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });

// Export models
const db = {
  Book,
  Review,
  sequelize,
};

module.exports = db;