"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Comments", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      buyerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Buyers",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      adId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Ads",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      votes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Comments");
  },
};
