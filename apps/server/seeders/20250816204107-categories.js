"use strict";
module.exports = {
  up: async (queryInterface) =>
    queryInterface
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
      ) // ← вернёт id
      .then((inserted) => {
        global.categoryIds = inserted.map((r) => r.id);
      }),

  down: async (queryInterface) =>
    queryInterface.bulkDelete("categories", null, {}),
};
