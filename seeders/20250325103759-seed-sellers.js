"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Sellers", [
      {
        id: "550e8400-e29b-41d4-a716-446655440111",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440222",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Sellers", null, {});
  },
};
