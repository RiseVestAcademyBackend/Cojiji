"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Comments", [
      {
        id: uuidv4(),
        content: "This is a great product!",
        buyerId: "e72b1288-8c60-4e6f-a06d-9a362b2c8ea3",
        adId: "550e8400-e29b-41d4-a716-446655440002",
        votes: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        content: "I am interested in this item!",
        buyerId: "c917e5ab-49f9-4a6b-9491-b1735643dcd5",
        adId: "550e8400-e29b-41d4-a716-446655440000",
        votes: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Comments", null, {});
  },
};
