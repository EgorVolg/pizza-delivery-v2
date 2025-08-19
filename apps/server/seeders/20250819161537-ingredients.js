"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete("ingredients", null, {});
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "ingredients_id_seq" RESTART WITH 1'
    );

    await queryInterface.bulkInsert("ingredients", [
      { id: 1, name: "Моцарелла" },
      { id: 2, name: "Томаты" },
      { id: 3, name: "Чеснок" },
      { id: 4, name: "Красный лук" },
      { id: 5, name: "Сладкий перец" },
      { id: 6, name: "Бекон" },
      { id: 7, name: "Шампиньоны" },
      { id: 8, name: "Цыпленок" },
      { id: 9, name: "Ветчина" },
      { id: 10, name: "Пепперони" },
      { id: 11, name: "Колбаски чоризо" },
      { id: 12, name: "Ананасы" },
      { id: 13, name: "Маринованные огурчики" },
      { id: 14, name: "Брынза" },
      { id: 15, name: "Чеддер" },
      { id: 16, name: "Пармезан" },
      { id: 17, name: "Сыр блю чиз" },
      { id: 18, name: "Креветки" },
      { id: 19, name: "Говядина пряная" },
      { id: 20, name: "Итальянские травы" },
    ]);
  },

  down: async (queryInterface) =>
    await queryInterface.bulkDelete("ingredients", null, {}),
};
