"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete("desserts", null, {});
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "desserts_id_seq" RESTART WITH 1'
    );

    await queryInterface.bulkInsert(
      "desserts",
      [
        {
          name: "Яблочный крамбл",
          ingredients: null,
          price: 350,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/desserts/applecramble.avif",
          type: null,
          size: null,
          description:
            "Тёплый яблочный крамбл с хрустящей корочкой и мягкой начинкой.",
          category_id: 6,
          rating: 8,
          popular: 520,
          weight: ["180"],
          quantity: ["1"],
        },
        {
          name: "Чёрный маффин",
          ingredients: null,
          price: 280,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/desserts/blackmaffin.avif",
          type: null,
          size: null,
          description:
            "Шоколадный маффин с насыщенным вкусом и мягкой текстурой.",
          category_id: 6,
          rating: 7,
          popular: 430,
          weight: ["120"],
          quantity: ["1"],
        },
        {
          name: "Бруслетт",
          ingredients: null,
          price: 300,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/desserts/bruslette.avif",
          type: null,
          size: null,
          description: "Лёгкий десерт с ягодами и кремовой основой.",
          category_id: 6,
          rating: 8,
          popular: 470,
          weight: ["120", "270"],
          quantity: ["8", "16"],
        },
        {
          name: "Чизкейк бананово-шоколадный",
          ingredients: null,
          price: 450,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/desserts/cheececakebananachoco.avif",
          type: null,
          size: null,
          description: "Чизкейк с банановым кремом и шоколадной глазурью.",
          category_id: 6,
          rating: 9,
          popular: 650,
          weight: ["250"],
          quantity: ["1"],
        },
        {
          name: "Чизкейк карамель-арахис",
          ingredients: null,
          price: 470,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/desserts/cheececakecaramelarahis.avif",
          type: null,
          size: null,
          description: "Сливочный чизкейк с карамелью и арахисовой посыпкой.",
          category_id: 6,
          rating: 8,
          popular: 600,
          weight: ["260"],
          quantity: ["1"],
        },
        {
          name: "Чизкейк Нью-Йорк",
          ingredients: null,
          price: 480,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/desserts/cheececakenewyork.avif",
          type: null,
          size: null,
          description:
            "Классический нью-йоркский чизкейк с нежной текстурой и сливочным вкусом.",
          category_id: 6,
          rating: 9,
          popular: 700,
          weight: ["270"],
          quantity: ["1"],
        },
        {
          name: "Чизкейк Дубай",
          ingredients: null,
          price: 520,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/desserts/cheesecakedubai.avif",
          type: null,
          size: null,
          description: "Роскошный чизкейк с экзотической начинкой и топпингом.",
          category_id: 6,
          rating: 9,
          popular: 680,
          weight: ["280"],
          quantity: ["1"],
        },
        {
          name: "Шоколадное печенье",
          ingredients: null,
          price: 250,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/desserts/chococoockies.avif",
          type: null,
          size: null,
          description:
            "Шоколадное печенье с кусочками шоколада и мягкой серединкой.",
          category_id: 6,
          rating: 7,
          popular: 500,
          weight: ["80"],
          quantity: ["1"],
        },
        {
          name: "Додобон",
          ingredients: null,
          price: 300,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/desserts/dodobon.avif",
          type: null,
          size: null,
          description:
            "Десертный батончик с шоколадной глазурью и ореховой начинкой.",
          category_id: 6,
          rating: 8,
          popular: 480,
          weight: ["120", "270"],
          quantity: ["8", "16"],
        },
        {
          name: "Фондан",
          ingredients: null,
          price: 350,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/desserts/fondan.avif",
          type: null,
          size: null,
          description: "Нежный шоколадный фондан с жидкой сердцевиной.",
          category_id: 6,
          rating: 9,
          popular: 600,
          weight: ["160"],
          quantity: ["2"],
        },
        {
          name: "Лимонный тарт",
          ingredients: null,
          price: 330,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/desserts/lemontart.avif",
          type: null,
          size: null,
          description:
            "Лёгкий лимонный тарт с хрустящей корочкой и кисло-сладкой начинкой.",
          category_id: 6,
          rating: 8,
          popular: 520,
          weight: ["150"],
          quantity: ["1"],
        },
        {
          name: "Маффин Три шоколада",
          ingredients: null,
          price: 300,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/desserts/maffin3chocolste.avif",
          type: null,
          size: null,
          description: "Маффин с тройным шоколадом — темный, молочный и белый.",
          category_id: 6,
          rating: 8,
          popular: 450,
          weight: ["130"],
          quantity: ["1"],
        },
        {
          name: "Маффин солёная карамель",
          ingredients: null,
          price: 320,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/desserts/maffinsaltycaramel.avif",
          type: null,
          size: null,
          description: "Маффин с солёной карамелью и нежной текстурой.",
          category_id: 6,
          rating: 7,
          popular: 460,
          weight: ["140"],
          quantity: ["1"],
        },
        {
          name: "Торт Муравейник",
          ingredients: null,
          price: 400,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/desserts/muraveicake.avif",
          type: null,
          size: null,
          description:
            "Десерт «Муравейник» с кремовой начинкой и крошкой из печенья.",
          category_id: 6,
          rating: 8,
          popular: 590,
          weight: ["350"],
          quantity: ["1"],
        },
        {
          name: "Сырники",
          ingredients: null,
          price: 250,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/desserts/siriniki.avif",
          type: null,
          size: null,
          description:
            "Классические творожные сырники с нежной текстурой и лёгкой корочкой.",
          category_id: 6,
          rating: 8,
          popular: 480,
          weight: ["150", "280"],
          quantity: ["2", "4"],
        },
        {
          name: "Сырники с малиной",
          ingredients: null,
          price: 270,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/desserts/sirnikiwithraspberry.avif",
          type: null,
          size: null,
          description:
            "Сырники с добавлением свежей малины, подаются с ягодным соусом.",
          category_id: 6,
          rating: 9,
          popular: 520,
          weight: ["150", "280"],
          quantity: ["2", "4"],
        },
        {
          name: "Сырники со сгущёнкой",
          ingredients: null,
          price: 280,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/desserts/sirnikiwithsgushenka.avif",
          type: null,
          size: null,
          description:
            "Сырники с варёной сгущёнкой — классический сладкий десерт.",
          category_id: 6,
          rating: 9,
          popular: 540,
          weight: ["150", "280"],
          quantity: ["2", "4"],
        },
        {
          name: "Тирамису",
          ingredients: null,
          price: 500,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/desserts/tiramisu.avif",
          type: null,
          size: null,
          description:
            "Классическое итальянское тирамису с кремом из маскарпоне и кофе.",
          category_id: 6,
          rating: 10,
          popular: 750,
          weight: ["200"],
          quantity: ["1"],
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("desserts", null, {});
  },
};
