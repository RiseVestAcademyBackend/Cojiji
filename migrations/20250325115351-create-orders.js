"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      status: {
        type: Sequelize.ENUM("failed", "inprogress", "successful"),
        defaultValue: "inprogress",
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
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.createTable("OrderAd", {
      orderId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Orders",
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
    await queryInterface.dropTable("OrderAd");
    await queryInterface.dropTable("Orders");
  },
};
