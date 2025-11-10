"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "coffees",
      [
        {
          name: "Кофе Американо",
          ingredients: null,
          price: 250,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/americano.avif",
          type: [1],
          size: ["0.2", "0.3", "0.5"],
          description:
            "Классический кофе Американо — насыщенный вкус и бодрость в каждой чашке.",
          category_id: 5,
          rating: 4.7,
          popular: 3500,
          weight: null,
          quantity: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Кофе Латте",
          ingredients: null,
          price: 290,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/latte.avif",
          type: [1],
          size: ["0.2", "0.3", "0.5"],
          description:
            "Нежный латте с мягким молочным вкусом и ароматом свежесваренного кофе.",
          category_id: 5,
          rating: 4.8,
          popular: 4100,
          weight: null,
          quantity: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Кофе Капучино",
          ingredients: null,
          price: 280,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/capuccino.avif",
          type: [1],
          size: ["0.2", "0.3", "0.5"],
          description:
            "Ароматный капучино с бархатной пенкой и насыщенным вкусом кофе.",
          category_id: 5,
          rating: 4.9,
          popular: 5200,
          weight: null,
          quantity: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Кофе Карамельный капучино",
          ingredients: null,
          price: 310,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/caramelcappuccino.avif",
          type: [1],
          size: ["0.2", "0.3", "0.5"],
          description:
            "Капучино с карамельным сиропом — сладкий и тёплый вкус уюта.",
          category_id: 5,
          rating: 4.9,
          popular: 4900,
          weight: null,
          quantity: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Кофе Кокосовый латте",
          ingredients: null,
          price: 320,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/coconutlatte.avif",
          type: [1],
          size: ["0.2", "0.3", "0.5"],
          description:
            "Мягкий латте с кокосовым молоком и нежным экзотическим ароматом.",
          category_id: 5,
          rating: 4.8,
          popular: 4600,
          weight: null,
          quantity: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Кофе Ореховый латте",
          ingredients: null,
          price: 310,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/almond.avif",
          type: [1],
          size: ["0.2", "0.3", "0.5"],
          description:
            "Латте с ореховым сиропом — гармония кофе и нежного орехового вкуса.",
          category_id: 5,
          rating: 4.9,
          popular: 4800,
          weight: null,
          quantity: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Кофе Айс капучино",
          ingredients: null,
          price: 330,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/icecapuccino.avif",
          type: [1],
          size: ["0.2", "0.3", "0.5"],
          description:
            "Освежающий капучино со льдом — идеальный выбор для жаркого дня.",
          category_id: 5,
          rating: 4.7,
          popular: 4000,
          weight: null,
          quantity: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Темный лес",
          ingredients: null,
          price: 340,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/visnyachocolate.avif",
          type: [1],
          size: ["0.2", "0.3", "0.5"],
          description:
            "Кофе с шоколадом и вишнёвым сиропом — густой, насыщенный и ароматный вкус.",
          category_id: 5,
          rating: 4.9,
          popular: 5300,
          weight: null,
          quantity: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("coffees", null, {});
  },
};
