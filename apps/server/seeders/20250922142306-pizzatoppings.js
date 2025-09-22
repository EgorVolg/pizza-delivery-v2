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
          image:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/bacon.png",
          price: 110,
        },
        {
          name: "Баварские колбаски",
          image:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/bavariansausages.png",
          price: 95,
        },
        {
          name: "Блю чиз",
          image:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/bluecheese.png",
          price: 100,
        },
        {
          name: "Чеддер",
          image:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/cheddar.png",
          price: 85,
        },
        {
          name: "Сырный бортик",
          image:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/cheeseborder.png",
          price: 120,
        },
        {
          name: "Куcочки курицы",
          image:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/chiken.png",
          price: 90,
        },
        {
          name: "Чоризо",
          image:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/choriso.png",
          price: 95,
        },
        {
          name: "Маринованные огурцчики",
          image:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/cucumbers.png",
          price: 50,
        },
        {
          name: "Ломтики феты",
          image:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/feta.png",
          price: 80,
        },
        {
          name: "Ветчина",
          image:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/ham.png",
          price: 100,
        },
        {
          name: "Халапеньо",
          image:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/jalopeno.png",
          price: 65,
        },
        {
          name: "Моцарелла",
          image:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/mozarella.png",
          price: 85,
        },
        {
          name: "Грибы",
          image:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/mushrooms.png",
          price: 70,
        },
        {
          name: "Пепперони",
          image:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/pepperoni.png",
          price: 95,
        },
        {
          name: "Ананасы",
          image:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/pineapples.png",
          price: 75,
        },
        {
          name: "Прованские травы",
          image:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/provencalherbs.png",
          price: 60,
        },
        {
          name: "Красный лук",
          image:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/redonion.png",
          price: 55,
        },
        {
          name: "Креветки",
          image:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/shrimps.png",
          price: 115,
        },
        {
          name: "Острый чоризо",
          image:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/spicychoriso.png",
          price: 100,
        },
        {
          name: "Сладкий перец",
          image:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizzatoppings/sweetpepper.png",
          price: 65,
        },
        {
          name: "Сочные томаты",
          image:
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
