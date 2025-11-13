"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete("sauces", null, {});
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "sauces_id_seq" RESTART WITH 1'
    );

    await queryInterface.bulkInsert(
      "sauces",
      [
        {
          name: "Соус 1000 островов",
          ingredients: null,
          price: 70,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/sauces/1000iceland.avif",
          type: null,
          size: null,
          description:
            "Классический соус с нотками томата и сливочной заправкой.",
          category_id: 8,
          rating: 8,
          popular: 430,
          weight: ["25"],
          quantity: ["1"],
        },
        {
          name: "Два соуса",
          ingredients: null,
          price: 120,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/sauces/2sauces.avif",
          type: null,
          size: null,
          description: "Комбо из двух популярных соусов на выбор.",
          category_id: 8,
          rating: 9,
          popular: 500,
          weight: ["25"],
          quantity: ["1"],
        },
        {
          name: "Барбекю",
          ingredients: null,
          price: 60,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/sauces/bbq.avif",
          type: null,
          size: null,
          description: "Соус барбекю с копчёным вкусом и лёгкой сладостью.",
          category_id: 8,
          rating: 9,
          popular: 620,
          weight: ["25"],
          quantity: ["1"],
        },
        {
          name: "Сырный соус",
          ingredients: null,
          price: 70,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/sauces/cheece.avif",
          type: null,
          size: null,
          description: "Нежный сырный соус с лёгким сливочным ароматом.",
          category_id: 8,
          rating: 10,
          popular: 710,
          weight: ["25"],
          quantity: ["1"],
        },
        {
          name: "Чесночный соус",
          ingredients: null,
          price: 60,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/sauces/chesnok.avif",
          type: null,
          size: null,
          description:
            "Пикантный соус с насыщенным вкусом чеснока и сливочной основой.",
          category_id: 8,
          rating: 8,
          popular: 560,
          weight: ["25"],
          quantity: ["1"],
        },
        {
          name: "Малиновое варенье",
          ingredients: null,
          price: 65,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/sauces/raspberry.avif",
          type: null,
          size: null,
          description: "Идеально к сырникам",
          category_id: 8,
          rating: 9,
          popular: 600,
          weight: ["25"],
          quantity: ["1"],
        },
        {
          name: "Сгущёнка",
          ingredients: null,
          price: 65,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/sauces/sgushenka.avif",
          type: null,
          size: null,
          description: "Идеально к сырникам",
          category_id: 8,
          rating: 9,
          popular: 580,
          weight: ["7"],
          quantity: ["1"],
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("sauces", null, {});
  },
};
