"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Orders", [
      {
        id: "660e8400-e29b-41d4-a716-446655440001",
        status: "successful",
        buyerId: "e72b1288-8c60-4e6f-a06d-9a362b2c8ea3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440002",
        status: "inprogress",
        buyerId: "c917e5ab-49f9-4a6b-9491-b1735643dcd5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("OrderAd", [
      {
        orderId: "660e8400-e29b-41d4-a716-446655440001",
        adId: "550e8400-e29b-41d4-a716-446655440000",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: "660e8400-e29b-41d4-a716-446655440002",
        adId: "550e8400-e29b-41d4-a716-446655440002",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("OrderAd", null, {});
    await queryInterface.bulkDelete("Orders", null, {});
  },
};
