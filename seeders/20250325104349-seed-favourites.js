"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Favourites", [
      {
        id: uuidv4(),
        buyerId: "c917e5ab-49f9-4a6b-9491-b1735643dcd5",
        adId: "550e8400-e29b-41d4-a716-446655440002",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        buyerId: "e72b1288-8c60-4e6f-a06d-9a362b2c8ea3",
        adId: "550e8400-e29b-41d4-a716-446655440000",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Favourites", null, {});
  },
};
