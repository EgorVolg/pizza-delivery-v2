"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete("cocktails", null, {});
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "cocktails_id_seq" RESTART WITH 1'
    );

    await queryInterface.bulkInsert(
      "cocktails",
      [
        {
          name: "Шоколадный",
          ingredients: null,
          price: 510,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/cocktails/chocolate.avif",
          type: null,
          size: null,
          description:
            "Нежный шоколадный коктейль с глубоким вкусом какао и лёгкой сливочной текстурой.",
          category_id: 4,
          rating: 9,
          popular: 1,
          weight: ["0.3", "0.6"],
          quantity: null,
        },
        {
          name: "Классический",
          ingredients: null,
          price: 470,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/cocktails/classic.avif",
          type: null,
          size: null,
          description:
            "Классический молочный коктейль с идеально сбалансированным вкусом и лёгкой сладостью.",
          category_id: 4,
          rating: 8,
          popular: 0,
          weight: ["0.3", "0.6"],
          quantity: null,
        },
        {
          name: "Фисташковый",
          ingredients: null,
          price: 520,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/cocktails/fistashki.avif",
          type: null,
          size: null,
          description:
            "Ароматный фисташковый коктейль с насыщенным ореховым вкусом и бархатистой структурой.",
          category_id: 4,
          rating: 10,
          popular: 1,
          weight: ["0.3", "0.6"],
          quantity: null,
        },
        {
          name: "Орео",
          ingredients: null,
          price: 540,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/cocktails/oreo.avif",
          type: null,
          size: null,
          description:
            "Коктейль с печеньем Oreo — сочетание сливочной основы и хрустящих кусочков шоколадного печенья.",
          category_id: 4,
          rating: 9,
          popular: 1,
          weight: ["0.3", "0.6"],
          quantity: null,
        },
        {
          name: "Персиковый",
          ingredients: null,
          price: 490,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/cocktails/peach.avif",
          type: null,
          size: null,
          description:
            "Освежающий персиковый коктейль с ярким ароматом и лёгкой фруктовой сладостью.",
          category_id: 4,
          rating: 8,
          popular: 0,
          weight: ["0.3", "0.6"],
          quantity: null,
        },
        {
          name: "Малиновый",
          ingredients: null,
          price: 515,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/cocktails/raspberry.avif",
          type: null,
          size: null,
          description:
            "Малиновый коктейль с насыщенным вкусом спелых ягод и освежающим послевкусием.",
          category_id: 4,
          rating: 9,
          popular: 1,
          weight: ["0.3", "0.6"],
          quantity: null,
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("cocktails", null, {});
  },
};
