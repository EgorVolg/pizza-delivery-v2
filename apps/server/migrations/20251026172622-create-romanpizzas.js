"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("romanpizzas", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      imageUrl: Sequelize.STRING,
      description: Sequelize.TEXT,
      category_id: Sequelize.INTEGER,
      rating: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      size: {
        type: Sequelize.JSONB,
        defaultValue: [],
      },
      popular: Sequelize.INTEGER,
      type: {
        type: Sequelize.JSONB,
        defaultValue: [],
      },
      ingredients: {
        type: Sequelize.JSONB,
        defaultValue: [],
      },
      quantity: {
        type: Sequelize.JSONB,
        defaultValue: [null],
      },
      weight: {
        type: Sequelize.JSONB,
        defaultValue: [null],
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("romanpizzas");
  },
};
