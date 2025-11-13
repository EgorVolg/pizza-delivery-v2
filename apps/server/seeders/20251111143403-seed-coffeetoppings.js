"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete("coffeetoppings", null, {});
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "coffeetoppings_id_seq" RESTART WITH 1'
    );

    await queryInterface.bulkInsert(
      "coffeetoppings",
      [
        {
          name: "Миндаль",
          price: 50,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/coffeetoppings/almond.png",
        },
        {
          name: "Карамель",
          price: 50,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/coffeetoppings/caramel.png",
        },
        {
          name: "Кокос",
          price: 50,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/coffeetoppings/coconut.png",
        },
        {
          name: `${"Сироп" + "Темный лес"}`,
          price: 50,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/coffeetoppings/darkforest.png",
        },
        {
          name: "Молоко",
          price: 50,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/coffeetoppings/milk.png",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("coffeetoppings", null, {});
  },
};
