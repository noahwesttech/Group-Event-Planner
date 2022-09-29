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
    event_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event_date: {
      type: DataTypes.DATE,
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
      get() {
        return this.getDataValue("invite_emails").split(";");
      },
      set(val) {
        this.setDataValue("invite_emails", val.join(";"));
      },
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
