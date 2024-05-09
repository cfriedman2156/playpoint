const sequelize = require('../config/connection');
const { User, Game, Review, Friendship } = require('../models');

const userData = require('./userData.json');
const gameData = require('./gameData.json');
const reviewData = require('./reviewData.json');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    console.log("User created");

    await Game.bulkCreate(gameData);
    console.log("Game added");

    await Review.bulkCreate(reviewData);
    console.log("Review added");

      process.exit(0);
    };
    
    seedDatabase();