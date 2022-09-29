// import models
const Event = require("./Event");
const User = require("./User");
const Item = require("./Item");

User.hasMany(Event, {
  foreignKey: "user_id",
  onDelete: 'CASCADE',
  hooks: true,
});

Event.belongsTo(User, {
  foreignKey: "user_id",
});

Item.belongsTo(Event, {
  foreignKey: "event_id",
});

Event.hasMany(Item, {
  foreignKey: "event_id",
  onDelete: 'CASCADE',
  hooks: true,
});

Item.belongsTo(User, {
    foreignKey: "user_id",
});

User.hasMany(Item, {
    foreignKey: "user_id",
    onDelete: 'CASCADE',
    hooks: true,
});

module.exports = {
  Event,
  User,
  Item,
};
