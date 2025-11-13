"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete("pizzatoppings", null, {});
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "pizzatoppings_id_seq" RESTART WITH 1'
    );

    await queryInterface.bulkInsert(
      "pizzatoppings",
      [
        {
          name: "Бекон",
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/bacon.png",
          price: 110,
        },
        {
          name: "Баварские колбаски",
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/bavariansausages.png",
          price: 95,
        },
        {
          name: "Блю чиз",
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/bluecheese.png",
          price: 100,
        },
        {
          name: "Чеддер",
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/cheddar.png",
          price: 85,
        },
        {
          name: "Сырный бортик",
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/cheeseborder.png",
          price: 120,
        },
        {
          name: "Куcочки курицы",
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/chiken.png",
          price: 90,
        },
        {
          name: "Чоризо",
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/choriso.png",
          price: 95,
        },
        {
          name: "Маринованные огурцчики",
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/cucumbers.png",
          price: 50,
        },
        {
          name: "Ломтики феты",
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/feta.png",
          price: 80,
        },
        {
          name: "Ветчина",
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/ham.png",
          price: 100,
        },
        {
          name: "Халапеньо",
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/jalopeno.png",
          price: 65,
        },
        {
          name: "Моцарелла",
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/mozarella.png",
          price: 85,
        },
        {
          name: "Грибы",
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/mushrooms.png",
          price: 70,
        },
        {
          name: "Пепперони",
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/pepperoni.png",
          price: 95,
        },
        {
          name: "Ананасы",
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/pineapples.png",
          price: 75,
        },
        {
          name: "Прованские травы",
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/provencalherbs.png",
          price: 60,
        },
        {
          name: "Красный лук",
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/redonion.png",
          price: 55,
        },
        {
          name: "Креветки",
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/shrimps.png",
          price: 115,
        },
        {
          name: "Острый чоризо",
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/spicychoriso.png",
          price: 100,
        },
        {
          name: "Сладкий перец",
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/sweetpepper.png",
          price: 65,
        },
        {
          name: "Сочные томаты",
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/tomato.png",
          price: 55,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pizzatoppings", null, {});
  },
};
