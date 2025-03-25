"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Buyers", [
      {
        id: "e72b1288-8c60-4e6f-a06d-9a362b2c8ea3",
        fullname: "Chinedu Okafor",
        email: "chinedu@example.com",
        password: await bcrypt.hash("password123", 10),
        is_verified: true,
        sellerId: null,
        adminId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "c917e5ab-49f9-4a6b-9491-b1735643dcd5",
        fullname: "Amina Lawal",
        email: "amina@example.com",
        password: await bcrypt.hash("password123", 10),
        is_verified: false,
        sellerId: null,
        adminId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Buyers", null, {});
  },
};
