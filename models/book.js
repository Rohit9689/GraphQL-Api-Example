const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    edition: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });


  module.exports = Book




