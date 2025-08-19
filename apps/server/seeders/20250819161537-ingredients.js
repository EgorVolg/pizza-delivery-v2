"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete("ingredients", null, {});
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "ingredients_id_seq" RESTART WITH 1'
    );

    await queryInterface.bulkInsert("ingredients", [
      { id: 1, name: "Моцарелла" },
      { id: 2, name: "Фирменный томатный соус" },
      { id: 3, name: "Фирменный соус альфредо" },
      { id: 4, name: "Томаты" },
      { id: 5, name: "Чеснок" },
      { id: 6, name: "Красный лук" },
      { id: 7, name: "Сладкий перец" },
      { id: 8, name: "Бекон" },
      { id: 9, name: "Шампиньоны" },
      { id: 10, name: "Цыпленок" },
      { id: 11, name: "Ветчина" },
      { id: 12, name: "Пепперони" },
      { id: 13, name: "Колбаски чоризо" },
      { id: 14, name: "Ананасы" },
      { id: 15, name: "Маринованные огурчики" },
      { id: 16, name: "Брынза" },
      { id: 17, name: "Чеддер" },
      { id: 18, name: "Пармезан" },
      { id: 19, name: "Сыр блю чиз" },
      { id: 20, name: "Креветки" },
      { id: 21, name: "Говядина пряная" },
      { id: 22, name: "Грибной соус" },
      { id: 23, name: "Итальянские травы" },
      { id: 24, name: "Соус барбекю" },
      { id: 25, name: "Соус бургер" },
      { id: 26, name: "Соус гриль" },
      { id: 27, name: "Соус ранч" },
      { id: 28, name: "Соус песто" },
      { id: 29, name: "Соус сладкий чили" },
      { id: 30, name: "Соус терияки" },
      { id: 31, name: "Сырный соус" },
    ]);
  },

  down: async (queryInterface) =>
    await queryInterface.bulkDelete("ingredients", null, {}),
};
