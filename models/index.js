const User = require('./User');
const Game = require('./Game');
const Review = require('./Review');


User.hasMany(Review, {
    foreignKey:'user_id',
    onDelete: "CASCADE",
});

Review.belongsTo(User, {
    foreignKey: 'user_id',
});

Game.hasMany(Review, {
    foreignKey: 'game_id',
    onDelete: "CASCADE",
});

Review.belongsTo(Game, {
    foreignKey: 'game_id',
});

module.exports = { User, Game, Review };