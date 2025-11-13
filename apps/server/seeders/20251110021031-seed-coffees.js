"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete("coffees", null, {});
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "coffees_id_seq" RESTART WITH 1'
    );

    await queryInterface.bulkInsert(
      "coffees",
      [
        {
          name: "Кофе Американо",
          ingredients: null,
          price: 250,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/coffee/americano.avif",
          type: null,
          size: null,
          description:
            "Классический кофе Американо — насыщенный вкус и бодрость в каждой чашке.",
          category_id: 5,
          rating: 4.7,
          popular: 3500,
          weight: ["0.2", "0.3", "0.5"],
          quantity: null,
        },
        {
          name: "Кофе Латте",
          ingredients: null,
          price: 290,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/coffee/latte.avif",
          type: null,
          size: null,
          description:
            "Нежный латте с мягким молочным вкусом и ароматом свежесваренного кофе.",
          category_id: 5,
          rating: 4.8,
          popular: 4100,
          weight: ["0.2", "0.3", "0.5"],
          quantity: null,
        },
        {
          name: "Кофе Капучино",
          ingredients: null,
          price: 280,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/coffee/capuccino.avif",
          type: null,
          size: null,
          description:
            "Ароматный капучино с бархатной пенкой и насыщенным вкусом кофе.",
          category_id: 5,
          rating: 4.9,
          popular: 5200,
          weight: ["0.2", "0.3", "0.5"],
          quantity: null,
        },
        {
          name: "Кофе Карамельный капучино",
          ingredients: null,
          price: 310,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/coffee/caramelcappuccino.avif",
          type: null,
          size: null,
          description:
            "Капучино с карамельным сиропом — сладкий и тёплый вкус уюта.",
          category_id: 5,
          rating: 4.9,
          popular: 4900,
          weight: ["0.2", "0.3", "0.5"],
          quantity: null,
        },
        {
          name: "Кофе Кокосовый латте",
          ingredients: null,
          price: 320,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/coffee/coconutlatte.avif",
          type: null,
          size: null,
          description:
            "Мягкий латте с кокосовым молоком и нежным экзотическим ароматом.",
          category_id: 5,
          rating: 4.8,
          popular: 4600,
          weight: ["0.2", "0.3", "0.5"],
          quantity: null,
        },
        {
          name: "Кофе Ореховый латте",
          ingredients: null,
          price: 310,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/coffee/almond.avif",
          type: null,
          size: null,
          description:
            "Латте с ореховым сиропом — гармония кофе и нежного орехового вкуса.",
          category_id: 5,
          rating: 4.9,
          popular: 4800,
          weight: ["0.2", "0.3", "0.5"],
          quantity: null,
        },
        {
          name: "Кофе Айс капучино",
          ingredients: null,
          price: 330,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/coffee/icecapuccino.avif",
          type: null,
          size: null,
          description:
            "Освежающий капучино со льдом — идеальный выбор для жаркого дня.",
          category_id: 5,
          rating: 4.7,
          popular: 4000,
          weight: ["0.2", "0.3", "0.5"],
          quantity: null,
        },
        {
          name: "Латте Темный лес",
          ingredients: null,
          price: 340,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/coffee/visnyachocolate.avif",
          type: null,
          size: null,
          description:
            "Кофе с шоколадом и вишнёвым сиропом — густой, насыщенный и ароматный вкус.",
          category_id: 5,
          rating: 4.9,
          popular: 5300,
          weight: ["0.2", "0.3", "0.5"],
          quantity: null,
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("coffees", null, {});
  },
};
