"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Admins", [
      {
        id: "b12f1a93-61ad-44ab-9e49-58d789c1fbd3",
        userName: "Super Admin",
        phoneNumber: "08123456789",
        role: "superadmin",
        status: "active",
        lastLoginAt: new Date(),
        lastLoginIp: "192.168.1.1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "e32c4b84-2fa3-4b21-bdd6-3b78cd91a2d2",
        userName: "John Doe",
        phoneNumber: "07011223344",
        role: "admin",
        status: "active",
        lastLoginAt: new Date(),
        lastLoginIp: "192.168.1.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Admins", null, {});
  },
};
