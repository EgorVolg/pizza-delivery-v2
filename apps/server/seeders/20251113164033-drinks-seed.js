"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete("drinks", null, {});
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "drinks_id_seq" RESTART WITH 1'
    );

    await queryInterface.bulkInsert(
      "drinks",
      [
        {
          name: "Арбуз-Лайм",
          ingredients: null,
          price: 470,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/drinks/arbuzlime.avif",
          type: null,
          size: null,
          description:
            "Освежающий напиток с сочным арбузом и лёгкой кислинкой лайма.",
          category_id: 7,
          rating: 9,
          popular: 1,
          weight: ["0.5"],
          quantity: ["1"],
        },
        {
          name: "Чёрная смородина",
          ingredients: null,
          price: 455,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/drinks/blacksmorodina.avif",
          type: null,
          size: null,
          description:
            "Напиток с насыщенным ягодным вкусом чёрной смородины и лёгким ароматом лета.",
          category_id: 7,
          rating: 8,
          popular: 0,
          weight: ["0.5"],
          quantity: ["1"],
        },
        {
          name: "Чёрный чай",
          ingredients: null,
          price: 420,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/drinks/blacktea.avif",
          type: null,
          size: null,
          description:
            "Классический холодный чёрный чай с мягким вкусом и освежающим послевкусием.",
          category_id: 7,
          rating: 9,
          popular: 1,
          weight: ["0.5"],
          quantity: ["1"],
        },
        {
          name: "Сок яблоко",
          ingredients: null,
          price: 460,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/drinks/cokyabloko.avif",
          type: null,
          size: null,
          description:
            "Натуральный яблочный сок с лёгкой кислинкой и приятной сладостью.",
          category_id: 7,
          rating: 8,
          popular: 0,
          weight: ["1"],
          quantity: ["1"],
        },
        {
          name: "Кола",
          ingredients: null,
          price: 480,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/drinks/cola.avif",
          type: null,
          size: null,
          description:
            "Классическая газированная кола со знакомым вкусом и бодрящим эффектом.",
          category_id: 7,
          rating: 9,
          popular: 1,
          weight: ["0.5"],
          quantity: ["1"],
        },
        {
          name: "Зелёный чай",
          ingredients: null,
          price: 440,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/drinks/green.avif",
          type: null,
          size: null,
          description:
            "Освежающий зелёный чай с мягким вкусом и лёгкими цветочными нотками.",
          category_id: 7,
          rating: 8,
          popular: 0,
          weight: ["0.5"],
          quantity: ["1"],
        },
        {
          name: "Зелёное манго",
          ingredients: null,
          price: 490,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/drinks/greenmango.avif",
          type: null,
          size: null,
          description:
            "Яркий напиток с экзотическим вкусом зелёного манго и лёгкой кислинкой.",
          category_id: 7,
          rating: 10,
          popular: 1,
          weight: ["0.5"],
          quantity: ["1"],
        },
        {
          name: "Ледяной лимон",
          ingredients: null,
          price: 450,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/drinks/icelemon.avif",
          type: null,
          size: null,
          description:
            "Прохладный лимонный напиток с лёгкой свежестью и цитрусовым ароматом.",
          category_id: 7,
          rating: 9,
          popular: 1,
          weight: ["0.5"],
          quantity: ["1"],
        },
        {
          name: "Какао",
          ingredients: null,
          price: 500,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/drinks/kakao.avif",
          type: null,
          size: null,
          description:
            "Горячее какао с насыщенным вкусом шоколада и мягкой сливочной текстурой.",
          category_id: 7,
          rating: 10,
          popular: 1,
          weight: ["0.5"],
          quantity: ["1"],
        },
        {
          name: "Киви-Виноград",
          ingredients: null,
          price: 460,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/drinks/kivivinograd.avif",
          type: null,
          size: null,
          description:
            "Фруктовый напиток с сочным вкусом киви и сладкими нотками винограда.",
          category_id: 7,
          rating: 8,
          popular: 0,
          weight: ["0.5"],
          quantity: ["1"],
        },
        {
          name: "Лимон-Лайм",
          ingredients: null,
          price: 470,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/drinks/lemonlime.avif",
          type: null,
          size: null,
          description: "Газированный напиток с бодрящим вкусом лимона и лайма.",
          category_id: 7,
          rating: 9,
          popular: 1,
          weight: ["0.5"],
          quantity: ["1"],
        },
        {
          name: "Морс Клюква",
          ingredients: null,
          price: 480,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/drinks/morsklukva.avif",
          type: null,
          size: null,
          description:
            "Традиционный клюквенный морс с натуральной кислинкой и лёгкой сладостью.",
          category_id: 7,
          rating: 9,
          popular: 1,
          weight: ["0.45"],
          quantity: ["1"],
        },
        {
          name: "Морс Вишня",
          ingredients: null,
          price: 475,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/drinks/morsvishnya.avif",
          type: null,
          size: null,
          description:
            "Освежающий морс из спелой вишни с насыщенным ягодным вкусом.",
          category_id: 7,
          rating: 8,
          popular: 0,
          weight: ["0.45"],
          quantity: ["1"],
        },
        {
          name: "Нектар Мультифрукт",
          ingredients: null,
          price: 490,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/drinks/nektarmultifruct.avif",
          type: null,
          size: null,
          description:
            "Фруктовый нектар с экзотическим сочетанием тропических плодов.",
          category_id: 7,
          rating: 9,
          popular: 1,
          weight: ["1"],
          quantity: ["1"],
        },
        {
          name: "Нектар Апельсин",
          ingredients: null,
          price: 480,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/drinks/nektarorange.avif",
          type: null,
          size: null,
          description:
            "Натуральный апельсиновый нектар с приятной кисло-сладкой нотой.",
          category_id: 7,
          rating: 9,
          popular: 0,
          weight: ["1"],
          quantity: ["1"],
        },
        {
          name: "Апельсиновый",
          ingredients: null,
          price: 460,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/drinks/orange.avif",
          type: null,
          size: null,
          description:
            "Яркий цитрусовый напиток с освежающим апельсиновым вкусом.",
          category_id: 7,
          rating: 8,
          popular: 0,
          weight: ["0.5"],
          quantity: ["1"],
        },
        {
          name: "Pulpy Апельсин",
          ingredients: null,
          price: 495,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/drinks/pulpyorange.avif",
          type: null,
          size: null,
          description:
            "Апельсиновый напиток с мякотью, насыщенным вкусом и натуральной текстурой.",
          category_id: 7,
          rating: 9,
          popular: 1,
          weight: ["0.5"],
          quantity: ["1"],
        },
        {
          name: "Таежный чай, 10 пакетиков",
          ingredients: null,
          price: 475,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/drinks/taygatea.avif",
          type: null,
          size: null,
          description:
            "Зеленый листовой чай с листьями мяты и лепестками василька.",
          category_id: 7,
          rating: 9,
          popular: 0,
          weight: null,
          quantity: ["1"],
        },
        {
          name: "Bonaqua Вода",
          ingredients: null,
          price: 430,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/drinks/waterbonaaqua.avif",
          type: null,
          size: null,
          description:
            "Чистая питьевая вода Bonaqua для освежающего утоления жажды.",
          category_id: 7,
          rating: 8,
          popular: 0,
          weight: ["0.5"],
          quantity: ["1"],
        },
        {
          name: "Кола Zero",
          ingredients: null,
          price: 485,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/drinks/zerocola.avif",
          type: null,
          size: null,
          description:
            "Безкалорийная версия классической колы с тем же насыщенным вкусом.",
          category_id: 7,
          rating: 9,
          popular: 1,
          weight: ["0.5"],
          quantity: ["1"],
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("drinks", null, {});
  },
};
