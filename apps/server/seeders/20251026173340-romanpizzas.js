"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("romanpizzas", null, {});
    await queryInterface.bulkInsert(
      "romanpizzas",
      [
        {
          name: "Римская Песто",
          price: 612,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/roman/pesto.avif",
          description: "Ароматная пицца с соусом песто.",
          category_id: 2,
          rating: 4,
          size: ["30"],
          popular: 8345,
          type: [3],
          ingredients: ["3", "7", "12", "1", "19"],
          quantity: null,
          weight: null,
        },
        {
          name: "Римская Аррива!",
          price: 738,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/roman/arriva.avif",
          description: "Яркая пицца с пикантным соусом.",
          category_id: 2,
          rating: 5,
          size: ["30"],
          popular: 9274,
          type: [3],
          ingredients: ["5", "2", "14"],
          quantity: null,
          weight: null,
        },
        {
          name: "Римская Жюльен",
          price: 684,
          size: ["30"],
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/roman/julien.avif",
          description: "Пицца с нежным соусом, грибами и сливочной ноткой.",
          category_id: 2,
          rating: 3,
          popular: 7521,
          type: [3],
          ingredients: ["8", "1", "17", "9"],
          quantity: null,
          weight: null,
        },
        {
          name: "Римская Пепперони",
          price: 799,
          size: ["30"],
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/roman/pepperoni.avif",
          description: "Классическая пицца с острыми колбасками пепперони.",
          category_id: 2,
          rating: 5,
          popular: 9862,
          type: [3],
          ingredients: ["20", "3", "11", "7", "2"],
          quantity: null,
          weight: null,
        },
        {
          name: "Римская Карбонара",
          price: 715,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/roman/carbonara.avif",
          description: "Пицца с беконом, сливочным соусом и сыром пармезан.",
          category_id: 2,
          rating: 4,
          popular: 8430,
          type: [3],
          size: ["30"],
          ingredients: ["4", "9", "1", "16", "12", "8"],
          quantity: null,
          weight: null,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("romanpizzas", null, {});
  },
};
