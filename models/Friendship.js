const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Friendship extends Model {}

Friendship.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    friend_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'friendship'
});

module.exports = Friendship;
