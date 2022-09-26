const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Event extends Model { }

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    event_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: "user",
          key: "id",
      }
    },
    invite_emails: {
      type: DataTypes.STRING,
      allowNull: false,
      // might need get/set functions here for formatting
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "event",
  }
);

module.exports = Event;
