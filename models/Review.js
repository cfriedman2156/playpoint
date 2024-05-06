const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {}
Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true, 
        },
        description: {
            typeof: DataTypes.TEXT,
            allowNull: false,
        },
        game_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'game',
              key: 'id',
            },
          },
          user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
            },
          },
    },
);
module.exports = Review;