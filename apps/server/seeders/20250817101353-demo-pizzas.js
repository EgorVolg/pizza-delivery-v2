"use strict";

module.exports = {
  up: async (queryInterface) => {
    const ids = global.categoryIds;

    await queryInterface.bulkInsert("pizzas", [
      {
        name: "Терияки",
        ingredients:
          "Нежный цыпленок, красный лук, сладкий перец, соус терияки, сыр моцарелла, фирменный соус альфредо",
        price: 369,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Teriyaki.avif",
        type: [1, 2],
        size: [30, 40],
        description:
          "Японское вдохновение в каждом куске — сладко-острый баланс, который покорит ваш вкус!",
        category_id: 1,
      },
      {
        name: "Чесночный цыпленок",
        ingredients:
          "Цыпленок, чеснок, томаты, моцарелла, фирменный соус альфредо",
        price: 279,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Meat.avif",
        type: [1],
        size: [20, 30],
        description:
          "Аромат чеснока и нежное куриное мясо — просто, но безупречно вкусно!",
        category_id: 1,
      },
      {
        name: "Пикантные колбаски",
        ingredients:
          "Классические колбаски, лук красный, моцарелла, фирменный томатный соус",
        price: 279,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Spicy sausages.avif",
        type: [2],
        size: [30],
        description:
          "Острая колбаса и ароматный соус — для тех, кто любит по-настоящему яркий вкус!",
        category_id: 1,
      },
      {
        name: "Пепперони фреш",
        ingredients:
          "Пикантная пепперони, увеличенная порция моцареллы, томаты, фирменный томатный соус",
        price: 269,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Pepperonifresh.avif",
        type: [1],
        size: [20, 30, 40],
        description:
          "Классика, которую любят все — пикантная пепперони и много сыра!",
        category_id: 1,
      },
      {
        name: "Четыре сыра",
        ingredients:
          "Сыр блю чиз, сыры чеддер и пармезан, моцарелла, фирменный соус альфредо",
        price: 389,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Fourseasons.avif",
        type: [2],
        size: [30, 40],
        description: "Настоящий рай для сыроманов — четыре сыра в одной пицце!",
        category_id: 1,
      },
      {
        name: "Сырная",
        ingredients:
          "Моцарелла, сыры чеддер и пармезан, фирменный соус альфредо",
        price: 269,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Fourseasons.avif",
        type: [1, 2],
        size: [20],
        description:
          "Сыр, сыр и ещё раз сыр — без лишнего, но с максимальным удовольствием!",
        category_id: 1,
      },
      {
        name: "Чоризо фреш",
        ingredients:
          "Острые колбаски чоризо, сладкий перец, моцарелла, фирменный томатный соус",
        price: 269,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Spicy sausages.avif",
        type: [1],
        size: [30, 40],
        description:
          "Острый и сочный вкус Испании в каждом куске — для любителей пикантного!",
        category_id: 1,
      },
      {
        name: "Ветчина и сыр",
        ingredients: "Ветчина, моцарелла, фирменный соус альфредо",
        price: 329,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Hamandmushrooms.avif",
        type: [2],
        size: [20, 30, 40],
        description:
          "Идеальное сочетание нежной ветчины и расплавленного сыра — всегда хит!",
        category_id: 1,
      },
      {
        name: "Двойной цыпленок",
        ingredients: "Цыпленок, моцарелла, фирменный соус альфредо",
        price: 329,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Meat.avif",
        type: [1],
        size: [30],
        description:
          "Двойная порция курицы — для тех, кто хочет больше белка и вкуса!",
        category_id: 1,
      },
      {
        name: "Креветка и песто",
        ingredients:
          "Креветки, томаты, шампиньоны, соус песто, моцарелла, итальянские травы, фирменный томатный соус",
        price: 509,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Pesto.avif",
        type: [2],
        size: [30, 40],
        description:
          "Итальянский шарм: морские креветки и ароматный соус песто в одной пицце!",
        category_id: 1,
      },
      {
        name: "Чилл Грилл",
        ingredients:
          "Цыпленок, маринованные огурчики, красный лук, соус гриль, моцарелла, чеснок, фирменный соус альфредо",
        price: 389,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Meat.avif",
        type: [1, 2],
        size: [30],
        description:
          "Лёгкий гриль-вкус и хрустящие огурчики — пицца, которая не оставит равнодушным!",
        category_id: 1,
      },
      {
        name: "Ветчина и грибы",
        ingredients:
          "Ветчина, шампиньоны, увеличенная порция моцареллы, фирменный томатный соус",
        price: 359,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Hamandmushrooms.avif",
        type: [1],
        size: [20, 30, 40],
        description:
          "Классика с лесным ароматом: ветчина и грибы в сырном объятии!",
        category_id: 1,
      },
      {
        name: "Аррива!",
        ingredients:
          "Цыпленок, острые колбаски чоризо, соус бургер, сладкий перец, красный лук, томаты, моцарелла, соус ранч, чеснок",
        price: 439,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/RomanArriva.avif",
        type: [2],
        size: [30, 40],
        description:
          "Фейерверк вкуса: острый, сочный и яркий — для настоящих гурманов!",
        category_id: 1,
      },
      {
        name: "Креветки со сладким чили",
        ingredients:
          "Креветки, ананасы, соус сладкий чили, сладкий перец, моцарелла, фирменный соус альфредо",
        price: 499,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Pesto.avif",
        type: [1],
        size: [30, 40],
        description:
          "Тропический вкус и лёгкая острота — пицца, которая удивит!",
        category_id: 1,
      },
      {
        name: "Бефстроганов",
        ingredients:
          "Пряная говядина, шампиньоны, ароматный грибной соус, маринованные огурчики, моцарелла, красный лук, фирменный соус альфредо",
        price: 519,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Meat.avif",
        type: [2],
        size: [30, 40],
        description:
          "Русская классика в итальянском исполнении — настоящий комфорт-фуд!",
        category_id: 1,
      },
      {
        name: "Карбонара",
        ingredients:
          "Бекон, сыры чеддер и пармезан, моцарелла, томаты, красный лук, чеснок, фирменный соус альфредо, итальянские травы",
        price: 449,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/RomanCarbonara.avif",
        type: [1, 2],
        size: [20, 30],
        description:
          "Любимый вкус пасты карбонара теперь в пицце — нежно, сытно, итальянски!",
        category_id: 1,
      },
      {
        name: "Жюльен",
        ingredients:
          "Цыпленок, шампиньоны, ароматный грибной соус, лук, сухой чеснок, моцарелла, смесь сыров чеддер и пармезан, фирменный соус альфредо",
        price: 399,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Julien.avif",
        type: [1],
        size: [30, 40],
        description:
          "Грибной крем-суп в форме пиццы — нежно, сытно и очень вкусно!",
        category_id: 1,
      },
      {
        name: "Песто",
        ingredients:
          "Цыпленок, соус песто, кубики брынзы, томаты, моцарелла, фирменный соус альфредо",
        price: 429,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Pesto.avif",
        type: [2],
        size: [20, 30, 40],
        description:
          "Свежий итальянский вкус: песто, брынза и курица — лёгко, вкусно, по-домашнему!",
        category_id: 1,
      },
      {
        name: "Мясная",
        ingredients:
          "Цыпленок, ветчина, пикантная пепперони, острые колбаски чоризо, моцарелла, фирменный томатный соус",
        price: 449,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Meat.avif",
        type: [1],
        size: [30, 40],
        description:
          "Мясной рай: курица, ветчина, пепперони и чоризо — для настоящих мясоедов!",
        category_id: 1,
      },
      {
        name: "Бургер-пицца",
        ingredients:
          "Ветчина, маринованные огурчики, томаты, красный лук, чеснок, соус бургер, моцарелла, фирменный томатный соус",
        price: 369,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Meat.avif",
        type: [2],
        size: [30],
        description:
          "Всё, что вы любите в бургере — теперь в пицце! Хрустящий, сочный, сытный!",
        category_id: 1,
      },
      {
        name: "Сырный цыпленок",
        ingredients:
          "Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, фирменный соус альфредо, чеснок",
        price: 449,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Fourseasons.avif",
        type: [1],
        size: [30, 40],
        description:
          "Сырная бомба: много курицы и ещё больше сыра — для настоящих гурманов!",
        category_id: 1,
      },
      {
        name: "Додо",
        ingredients:
          "Бекон, пряная говядина, пикантная пепперони, моцарелла, томаты, шампиньоны, сладкий перец, красный лук, чеснок, фирменный томатный соус",
        price: 529,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Meat.avif",
        type: [2],
        size: [30, 40],
        description:
          "Всё лучшее в одной пицце: мясо, овощи, сыр — настоящий праздник вкуса!",
        category_id: 1,
      },
      {
        name: "Пепперони",
        ingredients:
          "Пикантная пепперони, увеличенная порция моцареллы, фирменный томатный соус",
        price: 339,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Pepperoni.avif",
        type: [1],
        size: [20, 30, 40],
        description:
          "Классика, которую знают все — пикантная пепперони и много сыра!",
        category_id: 1,
      },
      {
        name: "Гавайская",
        ingredients:
          "Двойная порция цыпленка, ананасы, моцарелла, фирменный соус альфредо",
        price: 349,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Hawaiian.avif",
        type: [2],
        size: [30],
        description:
          "Тропический вкус: курица и ананас — сладко-солёное наслаждение в каждом куске!",
        category_id: 1,
      },
      {
        name: "Цыпленок барбекю",
        ingredients:
          "Цыпленок, бекон, соус барбекю, красный лук, моцарелла, фирменный томатный соус",
        price: 489,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Meat.avif",
        type: [1],
        size: [30, 40],
        description:
          "Дымный вкус гриля, сочная курица и бекон — это любовь с первого укуса!",
        category_id: 1,
      },
      {
        name: "Цыпленок ранч",
        ingredients:
          "Цыпленок, ветчина, соус ранч, моцарелла, томаты, чеснок, фирменный соус альфредо",
        price: 479,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Meat.avif",
        type: [2],
        size: [30, 40],
        description:
          "Нежная курица, ветчина и сливочный соус ранч — пицца, которую хочется заказывать снова!",
        category_id: 1,
      },
      {
        name: "Маргарита",
        ingredients:
          "Увеличенная порция моцареллы, томаты, итальянские травы, фирменный томатный соус",
        price: 389,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Margarita.avif",
        type: [1, 2],
        size: [20, 30],
        description: "Итальянская классика: просто, свежо и невероятно вкусно!",
        category_id: 1,
      },
      {
        name: "Диабло",
        ingredients:
          "Острые колбаски чоризо, острый перец халапеньо, соус барбекю, пряная говядина, томаты, сладкий перец, красный лук, моцарелла, фирменный томатный соус",
        price: 469,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Meat.avif",
        type: [1],
        size: [30, 40],
        description:
          "Огонь в каждом куске: для тех, кто любит по-настоящему остро!",
        category_id: 1,
      },
      {
        name: "Двойная пепперони",
        ingredients:
          "Двойная порция пикантной пепперони, увеличенная порция моцареллы, фирменный томатный соус",
        price: 439,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Pepperoni.avif",
        type: [2],
        size: [30, 40],
        description:
          "Двойная порция любимой пепперони — вдвое больше вкуса и удовольствия!",
        category_id: 1,
      },
      {
        name: "Четыре сезона",
        ingredients:
          "Увеличенная порция моцареллы, ветчина, пикантная пепперони, кубики брынзы, томаты, шампиньоны, итальянские травы, фирменный томатный соус",
        price: 509,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Fourseasons.avif",
        type: [1],
        size: [30, 40],
        description: "Каждый кусок — новый вкус: четыре сезона, четыре эмоции!",
        category_id: 1,
      },
      {
        name: "Овощи и грибы",
        ingredients:
          "Шампиньоны, томаты, сладкий перец, красный лук, кубики брынзы, моцарелла, фирменный томатный соус, итальянские травы",
        price: 389,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Vegetablesandmushroo.avif",
        type: [2],
        size: [20, 30],
        description:
          "Лёгкая, свежая и сытная — идеальный выбор для вегетарианцев и не только!",
        category_id: 1,
      },
      {
        name: "Пицца из половинок",
        ingredients: "Два вкуса в одной пицце 35 см",
        price: 800,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Pizza halves.avif",
        type: [1, 2],
        size: [40],
        description:
          "Не можете выбрать один вкус? Возьмите два в одной пицце — идеально для компании!",
        category_id: 1,
      },
      {
        name: "Додо микс",
        ingredients:
          "Бекон, цыпленок, ветчина, сыр блю чиз, сыры чеддер и пармезан, соус песто, кубики брынзы, томаты, красный лук, моцарелла, фирменный соус альфредо, чеснок, итальянские травы",
        price: 619,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Meat.avif",
        type: [1],
        size: [30, 40],
        description:
          "Всё самое вкусное в одной пицце — настоящий микс наслаждений!",
        category_id: 1,
      },
      {
        name: "Мясной микс с говядиной и колбасками",
        ingredients:
          "Пряная говядина, классические колбаски, пикантная пепперони, бекон, моцарелла, фирменный томатный соус",
        price: 609,
        imageUrl:
          "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Meatmixwithbeefandsausages.avif",
        type: [2],
        size: [30, 40],
        description:
          "Мясо в мясе — настоящий праздник для настоящих мужчин и любителей мясного!",
        category_id: 1,
      },
    ]);
  },

  down: async (queryInterface) => queryInterface.bulkDelete("pizzas", null, {}),
};
