const { DataTypes} = require('sequelize')
const sequelize = require('../config/db')


const Review = sequelize.define('Review',{
    rating:{
        type: DataTypes.FLOAT
    },
    comment:{
        type: DataTypes.STRING
    },
    bookId:{
        type:DataTypes.INTEGER,
        references:{
            model:'Books',
            key:'id'
        }
    }
})

module.exports = Review