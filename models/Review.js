const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Review extends Model {}
Review.init({
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
      model: "game",
      key: "id",
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "user",
      key: "id",
    },
  },
  stars: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 5,
      isWithinRange(value) {
        if (value < 1 || value > 5) {
          throw new Error("value must be within 1 and 5");
        }
      },
    },
  },
  created_time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  updated_time: {
    type: DataTypes.TIME,
    allowNull: true,
  }
});
module.exports = Review;
