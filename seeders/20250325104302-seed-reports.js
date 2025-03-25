"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Reports", [
      {
        id: "770e8400-e29b-41d4-a716-446655440111",
        reason: "Fake listing, seller is a scam.",
        status: "pending",
        reporterId: "e72b1288-8c60-4e6f-a06d-9a362b2c8ea3",
        postId: "550e8400-e29b-41d4-a716-446655440000",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "770e8400-e29b-41d4-a716-446655440222",
        reason: "Product scam, product is not as described.",
        status: "resolved",
        reporterId: "c917e5ab-49f9-4a6b-9491-b1735643dcd5",
        postId: "550e8400-e29b-41d4-a716-446655440002",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reports", null, {});
  },
};
