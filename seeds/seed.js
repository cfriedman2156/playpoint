const sequelize = require('../config/connection');
const { User, Game, Review } = require('../models');

const userData = require('./userData.json');
const gameData = require('./gameData.json');
const reviewData = require('./reviewData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    for (const game of gameData) {
      await Game.create({
        ...game,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }
  
    process.exit(0);
  };

//do we need another loop for review?


  seedDatabase();