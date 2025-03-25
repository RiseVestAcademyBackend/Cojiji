"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Ads", [
      {
        id: "550e8400-e29b-41d4-a716-446655440000",
        quantity: 5,
        title: "iPhone 14 Pro Max",
        description: "Brand new iPhone 14 Pro Max, 256GB, Space Black.",
        price: 1200.99,
        photo: "https://cloudinary.com/iphone14pro.jpg",
        boosted: true,
        sellerId: "550e8400-e29b-41d4-a716-446655440111",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440002",
        quantity: 2,
        title: "Samsung Galaxy S23 Ultra",
        description: "Latest Samsung flagship, great camera and performance.",
        price: 999.99,
        photo: "https://cloudinary.com/s23ultra.jpg",
        boosted: false,
        sellerId: "550e8400-e29b-41d4-a716-446655440222",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Ads", null, {});
  },
};
