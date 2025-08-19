"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete("pizzas", null, {});
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "pizzas_id_seq" RESTART WITH 1'
    );

    await queryInterface.bulkInsert(
      "pizzas",
      [
        {
          name: "Терияки",
          ingredients: [1, 29, 6, 7, 3],
          price: 369,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Teriyaki.avif",
          type: [1, 2],
          size: [30, 40],
          description:
            "Японское вдохновение в каждом куске — сладко-острый баланс, который покорит ваш вкус!",
          category_id: 1,
          rating: 4.7,
          popular: 4380,
        },
        {
          name: "Чесночный цыпленок",
          ingredients: [10, 5, 4, 1, 3],
          price: 279,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Meat.avif",
          type: [1],
          size: [20, 30],
          description:
            "Аромат чеснока и нежное куриное мясо — просто, но безупречно вкусно!",
          category_id: 1,
          rating: 4.2,
          popular: 2750,
        },
        {
          name: "Пикантные колбаски",
          ingredients: [13, 6, 1, 2],
          price: 279,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Spicy sausages.avif",
          type: [2],
          size: [30],
          description:
            "Острая колбаса и ароматный соус — для тех, кто любит по-настоящему яркий вкус!",
          category_id: 1,
          rating: 4.1,
          popular: 2100,
        },
        {
          name: "Пепперони фреш",
          ingredients: [12, 1, 4, 2],
          price: 269,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Pepperonifresh.avif",
          type: [1],
          size: [20, 30, 40],
          description:
            "Классика, которую любят все — пикантная пепперони и много сыра!",
          category_id: 1,
          rating: 4.6,
          popular: 3900,
        },
        {
          name: "Четыре сыра",
          ingredients: [1, 19, 17, 18, 3],
          price: 389,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Fourseasons.avif",
          type: [2],
          size: [30, 40],
          description:
            "Настоящий рай для сыроманов — четыре сыра в одной пицце!",
          category_id: 1,
          rating: 4.8,
          popular: 4600,
        },
        {
          name: "Сырная",
          ingredients: [1, 17, 18, 3],
          price: 269,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Fourseasons.avif",
          type: [1, 2],
          size: [20],
          description:
            "Сыр, сыр и ещё раз сыр — без лишнего, но с максимальным удовольствием!",
          category_id: 1,
          rating: 3.9,
          popular: 1800,
        },
        {
          name: "Чоризо фреш",
          ingredients: [13, 7, 1, 2],
          price: 269,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Spicy sausages.avif",
          type: [1],
          size: [30, 40],
          description:
            "Острый и сочный вкус Испании в каждом куске — для любителей пикантного!",
          category_id: 1,
          rating: 4.3,
          popular: 3100,
        },
        {
          name: "Ветчина и сыр",
          ingredients: [11, 1, 3],
          price: 329,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Hamandmushrooms.avif",
          type: [2],
          size: [20, 30, 40],
          description:
            "Идеальное сочетание нежной ветчины и расплавленного сыра — всегда хит!",
          category_id: 1,
          rating: 4.5,
          popular: 3700,
        },
        {
          name: "Двойной цыпленок",
          ingredients: [10, 1, 3],
          price: 329,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Meat.avif",
          type: [1],
          size: [30],
          description:
            "Двойная порция курицы — для тех, кто хочет больше белка и вкуса!",
          category_id: 1,
          rating: 4.0,
          popular: 2400,
        },
        {
          name: "Креветка и песто",
          ingredients: [20, 4, 9, 28, 1, 23, 2],
          price: 509,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Pesto.avif",
          type: [2],
          size: [30, 40],
          description:
            "Итальянский шарм: морские креветки и ароматный соус песто в одной пицце!",
          category_id: 1,
          rating: 4.9,
          popular: 4850,
        },
        {
          name: "Чилл Грилл",
          ingredients: [10, 15, 6, 26, 1, 5, 3],
          price: 389,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Meat.avif",
          type: [1, 2],
          size: [30],
          description:
            "Лёгкий гриль-вкус и хрустящие огурчики — пицца, которая не оставит равнодушным!",
          category_id: 1,
          rating: 4.4,
          popular: 3350,
        },
        {
          name: "Ветчина и грибы",
          ingredients: [11, 9, 1, 2],
          price: 359,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Hamandmushrooms.avif",
          type: [1],
          size: [20, 30, 40],
          description:
            "Классика с лесным ароматом: ветчина и грибы в сырном объятии!",
          category_id: 1,
          rating: 4.3,
          popular: 3200,
        },
        {
          name: "Аррива!",
          ingredients: [10, 13, 25, 7, 6, 4, 1, 27, 5],
          price: 439,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/RomanArriva.avif",
          type: [2],
          size: [30, 40],
          description:
            "Фейерверк вкуса: острый, сочный и яркий — для настоящих гурманов!",
          category_id: 2,
          rating: 4.7,
          popular: 4250,
        },
        {
          name: "Креветки со сладким чили",
          ingredients: [20, 14, 29, 7, 1, 3],
          price: 499,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Pesto.avif",
          type: [1],
          size: [30, 40],
          description:
            "Тропический вкус и лёгкая острота — пицца, которая удивит!",
          category_id: 1,
          rating: 4.6,
          popular: 3950,
        },
        {
          name: "Бефстроганов",
          ingredients: [21, 9, 22, 15, 1, 6, 3],
          price: 519,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Meat.avif",
          type: [2],
          size: [30, 40],
          description:
            "Русская классика в итальянском исполнении — настоящий комфорт-фуд!",
          category_id: 1,
          rating: 4.5,
          popular: 3800,
        },
        {
          name: "Карбонара",
          ingredients: [8, 17, 18, 1, 4, 6, 5, 3, 23],
          price: 449,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/RomanCarbonara.avif",
          type: [1, 2],
          size: [20, 30],
          description:
            "Любимый вкус пасты карбонара теперь в пицце — нежно, сытно, итальянски!",
          category_id: 2,
          rating: 4.8,
          popular: 4550,
        },
        {
          name: "Жюльен",
          ingredients: [10, 9, 22, 6, 5, 1, 17, 18, 3],
          price: 399,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Julien.avif",
          type: [1],
          size: [30, 40],
          description:
            "Грибной крем-суп в форме пиццы — нежно, сытно и очень вкусно!",
          category_id: 1,
          rating: 4.4,
          popular: 3450,
        },
        {
          name: "Песто",
          ingredients: [10, 28, 16, 4, 1, 3],
          price: 429,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Pesto.avif",
          type: [2],
          size: [20, 30, 40],
          description:
            "Свежий итальянский вкус: песто, брынза и курица — лёгко, вкусно, по-домашнему!",
          category_id: 1,
          rating: 4.7,
          popular: 4200,
        },
        {
          name: "Мясная",
          ingredients: [10, 11, 12, 13, 1, 2],
          price: 449,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Meat.avif",
          type: [1],
          size: [30, 40],
          description:
            "Мясной рай: курица, ветчина, пепперони и чоризо — для настоящих мясоедов!",
          category_id: 1,
          rating: 4.6,
          popular: 4000,
        },
        {
          name: "Бургер-пицца",
          ingredients: [11, 15, 4, 6, 5, 25, 1, 2],
          price: 369,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Meat.avif",
          type: [2],
          size: [30],
          description:
            "Всё, что вы любите в бургере — теперь в пицце! Хрустящий, сочный, сытный!",
          category_id: 1,
          rating: 4.3,
          popular: 3300,
        },
        {
          name: "Сырный цыпленок",
          ingredients: [10, 1, 17, 18, 31, 4, 3, 5],
          price: 449,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Fourseasons.avif",
          type: [1],
          size: [30, 40],
          description:
            "Сырная бомба: много курицы и ещё больше сыра — для настоящих гурманов!",
          category_id: 1,
          rating: 4.5,
          popular: 3750,
        },
        {
          name: "Додо",
          ingredients: [8, 21, 12, 13, 1, 4, 9, 7, 6, 5, 2],
          price: 529,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Meat.avif",
          type: [2],
          size: [30, 40],
          description:
            "Всё лучшее в одной пицце: мясо, овощи, сыр — настоящий праздник вкуса!",
          category_id: 1,
          rating: 4.9,
          popular: 4900,
        },
        {
          name: "Пепперони",
          ingredients: [12, 1, 2],
          price: 339,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Pepperoni.avif",
          type: [1],
          size: [20, 30, 40],
          description:
            "Классика, которую знают все — пикантная пепперони и много сыра!",
          category_id: 1,
          rating: 4.4,
          popular: 3600,
        },
        {
          name: "Гавайская",
          ingredients: [10, 14, 1, 3],
          price: 349,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Hawaiian.avif",
          type: [2],
          size: [30],
          description:
            "Тропический вкус: курица и ананас — сладко-солёное наслаждение в каждом куске!",
          category_id: 1,
          rating: 4.0,
          popular: 2600,
        },
        {
          name: "Цыпленок барбекю",
          ingredients: [10, 8, 24, 6, 1, 2],
          price: 489,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Meat.avif",
          type: [1],
          size: [30, 40],
          description:
            "Дымный вкус гриля, сочная курица и бекон — это любовь с первого укуса!",
          category_id: 1,
          rating: 4.7,
          popular: 4300,
        },
        {
          name: "Цыпленок ранч",
          ingredients: [10, 11, 27, 1, 4, 5, 3],
          price: 479,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Meat.avif",
          type: [2],
          size: [30, 40],
          description:
            "Нежная курица, ветчина и сливочный соус ранч — пицца, которую хочется заказывать снова!",
          category_id: 1,
          rating: 4.6,
          popular: 4050,
        },
        {
          name: "Маргарита",
          ingredients: [1, 4, 23, 2],
          price: 389,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Margarita.avif",
          type: [1, 2],
          size: [20, 30],
          description:
            "Итальянская классика: просто, свежо и невероятно вкусно!",
          category_id: 1,
          rating: 4.3,
          popular: 3150,
        },
        {
          name: "Диабло",
          ingredients: [13, 5, 24, 21, 4, 7, 6, 1, 2],
          price: 469,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Meat.avif",
          type: [1],
          size: [30, 40],
          description:
            "Огонь в каждом куске: для тех, кто любит по-настоящему остро!",
          category_id: 1,
          rating: 4.5,
          popular: 3700,
        },
        {
          name: "Двойная пепперони",
          ingredients: [12, 1, 2],
          price: 439,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Pepperoni.avif",
          type: [2],
          size: [30, 40],
          description:
            "Двойная порция любимой пепперони — вдвое больше вкуса и удовольствия!",
          category_id: 1,
          rating: 4.6,
          popular: 3950,
        },
        {
          name: "Четыре сезона",
          ingredients: [11, 12, 16, 4, 9, 1, 23, 2],
          price: 509,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Fourseasons.avif",
          type: [1],
          size: [30, 40],
          description:
            "Каждый кусок — новый вкус: четыре сезона, четыре эмоции!",
          category_id: 1,
          rating: 4.7,
          popular: 4400,
        },
        {
          name: "Овощи и грибы",
          ingredients: [9, 4, 7, 6, 16, 1, 23, 2],
          price: 389,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Vegetablesandmushroo.avif",
          type: [2],
          size: [20, 30],
          description:
            "Лёгкая, свежая и сытная — идеальный выбор для вегетарианцев и не только!",
          category_id: 1,
          rating: 4.2,
          popular: 2900,
        },
        {
          name: "Додо микс",
          ingredients: [8, 10, 11, 19, 17, 18, 28, 16, 6, 1, 5, 23],
          price: 619,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Meat.avif",
          type: [1],
          size: [30, 40],
          description:
            "Всё самое вкусное в одной пицце — настоящий микс наслаждений!",
          category_id: 1,
          rating: 4.9,
          popular: 4950,
        },
        {
          name: "Мясной микс с говядиной и колбасками",
          ingredients: [21, 13, 12, 8, 1, 2],
          price: 609,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Meatmixwithbeefandsausages.avif",
          type: [2],
          size: [30, 40],
          description:
            "Мясо в мясе — настоящий праздник для настоящих мужчин и любителей мясного!",
          category_id: 1,
          rating: 4.8,
          popular: 4700,
        },
      ],
      { returning: true }
    );
  },

  down: async (queryInterface) => queryInterface.bulkDelete("pizzas", null, {}),
};
