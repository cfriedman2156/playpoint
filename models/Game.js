//All this data will be coming from the api

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Game extends Model {}
Game.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true, 
        },
        
        name: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        cover: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rapid_id: {
            type: DataTypes.STRING,
            allowNull: false
        } }, 
        {
        sequelize,
         timestamps: false,
         freezeTableName: true,
         underscored: true,
         modelName: 'game', 
    },
);
module.exports = Game;