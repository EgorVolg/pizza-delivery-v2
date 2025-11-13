"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete("pizzas", null, {});
    await queryInterface.bulkDelete("romanpizzas", null, {});
    await queryInterface.bulkDelete("appetizers", null, {});
    await queryInterface.bulkDelete("coffees", null, {});
    await queryInterface.bulkDelete("drinks", null, {});
    await queryInterface.bulkDelete("categories", null, {});

    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "pizzas_id_seq" RESTART WITH 1'
    );
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "romanpizzas_id_seq" RESTART WITH 1'
    );
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "appetizers_id_seq" RESTART WITH 1'
    );
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "coffees_id_seq" RESTART WITH 1'
    );

    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "drinks_id_seq" RESTART WITH 1'
    );

    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "categories_id_seq" RESTART WITH 1'
    );

    await queryInterface.bulkInsert(
      "categories",
      [
        { name: "Пиццы" },
        {
          name: "Римские пиццы",
        },
        { name: "Закуски" },
        { name: "Коктейли" },
        { name: "Кофе" },
        { name: "Десерты" },
        { name: "Напитки" },
        { name: "Соусы" },
      ],
      { returning: true }
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
