const User = require('./User');
const Game = require('./Game');
const Review = require('./Review');
const Friendship = require('./Friendship');

User.hasMany(Review, {
    foreignKey:'user_id',
    onDelete: "CASCADE",
});

Review.belongsTo(User, {
    foreignKey:'user_id',
});

Game.hasMany(Review, {
    foreignKey:'game_id',
    onDelete: "CASCADE",
});

Review.belongsTo(Game, {
    foreignKey: 'game_id',
});

User.belongsToMany(User, { 
    as: 'Friends', through: Friendship, 
    foreignKey: 'user_id', 
    otherKey: 'friend_id' 
});

User.belongsToMany(User, { 
    as: 'FriendedBy', through: Friendship, 
    foreignKey: 'friend_id', 
    otherKey: 'user_id' });


module.exports = { User, Review, Game, Friendship };