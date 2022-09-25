const userSeeds = require("./User-seeds");
const itemSeeds = require("./Item-seeds");
const eventSeeds = require("./Event-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("--------------");
  await userSeeds();
  console.log("--------------");

  await eventSeeds();
  console.log("--------------");

  await itemSeeds();
  console.log("--------------");
  process.exit(0);
};

seedAll();
