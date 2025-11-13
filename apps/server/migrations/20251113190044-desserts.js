"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("desserts", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ingredients: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      size: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: { model: "categories", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      popular: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      weight: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      quantity: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("desserts");
  },
};
