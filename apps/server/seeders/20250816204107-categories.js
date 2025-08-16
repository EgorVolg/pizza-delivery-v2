"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          id: 1,
          name: "Пиццы",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: "Римские пиццы",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: "Закуски",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: "Коктейли",
          created_at: new Date(),
          updated_at: new Date(),
        },
        { id: 5, name: "Кофе", created_at: new Date(), updated_at: new Date() },
        {
          id: 6,
          name: "Напитки",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 7,
          name: "Соусы",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
