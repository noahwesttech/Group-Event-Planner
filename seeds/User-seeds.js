const { User } = require("../models");

const userdata = [
  {
    username: "Mike",
    email: "mike@gmail.com",
    password: "123456789",
  },
  {
    username: "Zachary",
    email: "zachary@gmail.com",
    password: "123456789",
  },
  {
    username: "Noah",
    email: "noah@gmail.com",
    password: "123456789",
  },
  {
    username: "Kevin",
    email: "kevin@gmail.com",
    password: "123456789",
  },
  {
    username: "Dina",
    email: "dina@gmail.com",
    password: "123456789",
  },
];

const userSeeds = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = userSeeds;
