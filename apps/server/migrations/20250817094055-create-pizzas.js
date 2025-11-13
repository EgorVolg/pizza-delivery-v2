"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pizzas", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      imageUrl: { type: Sequelize.STRING, allowNull: false },
      price: { type: Sequelize.INTEGER, allowNull: false },
      description: { type: Sequelize.TEXT },
      ingredients: { type: Sequelize.ARRAY(Sequelize.INTEGER) },
      size: { type: Sequelize.ARRAY(Sequelize.INTEGER) },
      type: { type: Sequelize.ARRAY(Sequelize.INTEGER) },
      popular: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      rating: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      category_id: {
        type: Sequelize.INTEGER,
        references: { model: "categories", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("pizzas");
  },
};
