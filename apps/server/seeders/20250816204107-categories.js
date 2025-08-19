"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete("categories", null, {});
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "categories_id_seq" RESTART WITH 1'
    );

    await queryInterface
      .bulkInsert(
        "categories",
        [
          { name: "Пиццы", createdAt: new Date(), updatedAt: new Date() },
          {
            name: "Римские пиццы",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          { name: "Закуски", createdAt: new Date(), updatedAt: new Date() },
          { name: "Коктейли", createdAt: new Date(), updatedAt: new Date() },
          { name: "Кофе", createdAt: new Date(), updatedAt: new Date() },
          { name: "Напитки", createdAt: new Date(), updatedAt: new Date() },
          { name: "Соусы", createdAt: new Date(), updatedAt: new Date() },
        ],
        { returning: true }
      ) 
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
