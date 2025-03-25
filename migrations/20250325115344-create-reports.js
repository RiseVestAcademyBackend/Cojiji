"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Reports", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      reason: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("pending", "resolved"),
        defaultValue: "pending",
      },
      reporterId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Buyers",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      postId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Ads",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Reports");
  },
};
