const User = require('./User');
// const Game = require('./Game');  Commenting out Game model since we don't need to store game data
const Review = require('./Review');


User.hasMany(Review, {
    foreignKey:'user_id',
    onDelete: "CASCADE",
});

Review.belongsTo(User, {
    foreignKey:'user_id',
});

// Game.hasMany(Review, {
//     foreignKey:'game_id',
//     onDelete: "CASCADE",
// });

// Review.belongsTo(Game, {
//     foreignKey: 'game_id',
// });

module.exports = { User, Review };