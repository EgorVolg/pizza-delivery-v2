"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete("appetizers", null, {});
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "appetizers_id_seq" RESTART WITH 1'
    );

    await queryInterface.bulkInsert(
      "appetizers",
      [
        {
          name: "Сырная закуска",
          price: 172,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/cheesestarter.avif",
          description:
            "Хрустящая сырная закуска с пряным соусом — идеальный старт для любого обеда.",
          category_id: 3,
          rating: 4,
          ingredients: null,
          popular: 8421,
          quantity: [1],
          weight: [150],
        },
        {
          name: "Куриные наггетсы",
          price: 223,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/chikennaggets.avif",
          description:
            "Золотистые куриные наггетсы с ароматом специй и нежным соусом.",
          category_id: 3,
          rating: 5,
          ingredients: null,
          popular: 9372,
          quantity: [5, 9],
          weight: [150, 270],
        },
        {
          name: "Чилл Гриль",
          price: 198,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/chillgrill.avif",
          description:
            "Пикантная закуска с острым вкусом и приятной дымной ноткой.",
          category_id: 3,
          rating: 4,
          ingredients: null,
          popular: 7684,
          quantity: [1],
          weight: [180],
        },
        {
          name: "Холодный ролл с курицей",
          price: 185,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/coldchikenroll.avif",
          description: "Лёгкий ролл с охлаждённой курицей и свежими овощами.",
          category_id: 3,
          rating: 3,
          popular: 7021,
          quantity: [1],
          ingredients: null,
          weight: [160],
        },
        {
          name: "Дэнвич с ветчиной и сыром",
          price: 241,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/danwichwithhamandcheese.avif",
          description: "Тёплый сэндвич с ветчиной, сыром и сливочным соусом.",
          category_id: 3,
          rating: 5,
          popular: 9120,
          quantity: [1],
          weight: [210],
          ingredients: null,
        },
        {
          name: "Дэнвич с мясом",
          price: 261,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/danwichwithmeat.avif",
          description:
            "Сытный мясной сэндвич с соусом барбекю и расплавленным сыром.",
          category_id: 3,
          rating: 4,
          popular: 8433,
          ingredients: null,
          quantity: [1],
          weight: [230],
        },
        {
          name: "Дэнвич с чоризо BBQ",
          price: 253,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/danwihchorisobbq.avif",
          description: "Острый сэндвич с чоризо и фирменным барбекю-соусом.",
          category_id: 3,
          rating: 5,
          ingredients: null,
          popular: 9677,
          quantity: [1],
          weight: [220],
        },
        {
          name: "Додстер",
          price: 219,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/dodster.avif",
          description: "Фирменный ролл с курицей, овощами и пикантным соусом.",
          category_id: 3,
          rating: 4,
          popular: 8802,
          ingredients: null,
          quantity: [1],
          weight: [190],
        },
        {
          name: "Додстер с ветчиной",
          price: 207,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/dodsterwithham.avif",
          description:
            "Классический додстер с добавлением нежной ветчины и сыра.",
          category_id: 3,
          rating: 3,
          popular: 7190,
          ingredients: null,
          quantity: [1],
          weight: [190],
        },
        {
          name: "Хашбрауны",
          price: 176,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/hashbrowns.avif",
          description:
            "Картофельные хашбрауны с хрустящей корочкой и мягкой серединкой.",
          category_id: 3,
          rating: 4,
          ingredients: null,
          popular: 8124,
          quantity: [2, 3, 5],
          weight: [120, 180, 300],
        },
        {
          name: "Карбонара",
          price: 258,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/karbonara.avif",
          description: "Классическая паста с беконом, сливками и пармезаном.",
          category_id: 3,
          rating: 5,
          ingredients: null,
          popular: 9873,
          quantity: [1],
          weight: [250],
        },
        {
          name: "Картофель по-деревенски",
          price: 194,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/kartofelpoderevensky.avif",
          description:
            "Обжаренный картофель дольками с пряными специями. Доступен в размерах: стандартный и большой.",
          category_id: 3,
          rating: 4,
          popular: 8642,
          ingredients: null,
          quantity: ["Стандартный", "Большой"],
          weight: [200, 320],
        },
        {
          name: "Креветки",
          price: 289,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/krevetki.avif",
          description:
            "Нежные тигровые креветки, обжаренные до золотистой корочки.",
          category_id: 3,
          rating: 5,
          ingredients: null,
          popular: 9422,
          quantity: [3, 5, 9],
          weight: [90, 150, 270],
        },
        {
          name: "Креветки с песто",
          price: 276,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/krevetkiipesto.avif",
          description:
            "Креветки в ароматном соусе песто с итальянскими травами.",
          category_id: 3,
          rating: 5,
          popular: 9034,
          ingredients: null,
          quantity: [3, 5, 9],
          weight: [90, 150, 270],
        },
        {
          name: "Креветки терияки",
          price: 268,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/krevetkyteriyaki.avif",
          description: "Креветки в сладко-солёном соусе терияки с кунжутом.",
          category_id: 3,
          rating: 4,
          ingredients: null,
          popular: 8302,
          quantity: [3, 5, 9],
          weight: [90, 150, 270],
        },
        {
          name: "Ланч-бокс Охотничий",
          price: 243,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/lanchboxohotnichiy.avif",
          description: "Плотный ланч-бокс с колбасками, картофелем и соусом.",
          category_id: 3,
          rating: 5,
          popular: 9254,
          quantity: [1],
          weight: [380],
          ingredients: null,
        },
        {
          name: "Грибная закуска",
          price: 183,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/mushroomsstarter.avif",
          description: "Обжаренные шампиньоны с чесноком и сливочным маслом.",
          category_id: 3,
          rating: 3,
          ingredients: null,
          popular: 6532,
          quantity: [1],
          weight: [180],
        },
        {
          name: "Омлет-конструктор",
          price: 205,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/omletconstructor.avif",
          description: "Создай свой омлет с любыми добавками и начинками.",
          category_id: 3,
          rating: 4,
          ingredients: null,
          popular: 7891,
          quantity: [1],
          weight: [200],
        },
        {
          name: "Омлет с сыром",
          price: 188,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/omletwihcheese.avif",
          description: "Нежный омлет с расплавленным сыром и сливочным вкусом.",
          category_id: 3,
          rating: 4,
          ingredients: null,
          popular: 7775,
          quantity: [1],
          weight: [190],
        },
        {
          name: "Омлет с беконом",
          price: 217,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/omletwithbacon.avif",
          description: "Классический омлет с поджаренным беконом и специями.",
          category_id: 3,
          rating: 5,
          popular: 9210,
          ingredients: null,
          quantity: [1],
          weight: [200],
        },
        {
          name: "Омлет с ветчиной и грибами",
          price: 231,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/omletwithhamandmushrooms.avif",
          description: "Сытный омлет с ветчиной, грибами и сыром.",
          category_id: 3,
          rating: 5,
          popular: 9038,
          ingredients: null,
          quantity: [1],
          weight: [210],
        },
        {
          name: "Омлет с пепперони",
          price: 192,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/omletwithpepperoni.avif",
          description: "Пикантный омлет с колбасой пепперони и сыром.",
          category_id: 3,
          rating: 4,
          popular: 8671,
          quantity: [1],
          ingredients: null,
          weight: [200],
        },
        {
          name: "Омлет с томатами",
          price: 177,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/omletwithtomatoes.avif",
          description: "Лёгкий омлет с сочными томатами и зеленью.",
          category_id: 3,
          rating: 3,
          popular: 7290,
          quantity: [1],
          ingredients: null,
          weight: [190],
        },
        {
          name: "Паста с креветками",
          price: 282,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/pastawithkrevetki.avif",
          description: "Паста в сливочном соусе с нежными креветками.",
          category_id: 3,
          rating: 5,
          popular: 9781,
          ingredients: null,
          quantity: [3, 5, 9],
          weight: [90, 150, 270],
        },
        {
          name: "Песто",
          price: 191,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/pesto.avif",
          description: "Ароматная паста с соусом песто и пармезаном.",
          category_id: 3,
          ingredients: null,
          rating: 4,
          popular: 8021,
          quantity: [1],
          weight: [250],
        },
        {
          name: "Картофель из печи",
          price: 169,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/potatoesfrombake.avif",
          description:
            "Запечённый картофель с травами и специями. Выберите размер порции — стандартный или большой.",
          category_id: 3,
          rating: 3,
          ingredients: null,
          popular: 7114,
          quantity: ["Стандартный", "Большой"],
          weight: [200, 320],
        },
        {
          name: "Картофель из печи с соусом",
          price: 186,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/potatoesfrombakewithsause.avif",
          description:
            "Запечённый картофель с ароматным соусом на выбор. Можно заказать стандартную или большую порцию.",
          category_id: 3,
          rating: 4,
          ingredients: null,
          popular: 8492,
          quantity: ["Стандартный", "Большой"],
          weight: [220, 340],
        },
        {
          name: "Салат Цезарь",
          price: 259,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/saladecesare.avif",
          description:
            "Классический салат с курицей, сухариками и соусом Цезарь.",
          category_id: 3,
          rating: 5,
          popular: 9920,
          quantity: [1],
          ingredients: null,
          weight: [230],
        },
        {
          name: "Острый додстер",
          price: 228,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/spicydodster.avif",
          description: "Пикантный ролл с курицей и острым соусом.",
          category_id: 3,
          rating: 4,
          popular: 8533,
          quantity: [1],
          ingredients: null,
          weight: [190],
        },
        {
          name: "Супер мясной додстер",
          price: 274,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/supermeatdodster.avif",
          description: "Мясной ролл с тремя видами мяса и сыром.",
          category_id: 3,
          rating: 5,
          popular: 9632,
          quantity: [1],
          ingredients: null,
          weight: [230],
        },
        {
          name: "Овощная смесь",
          price: 165,
          imageUrl:
            "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/appetizer/vegetablesmix.avif",
          description: "Полезная смесь из свежих и обжаренных овощей.",
          category_id: 3,
          rating: 3,
          ingredients: null,
          popular: 6901,
          quantity: [1],
          weight: [200],
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("appetizers", null, {});
  },
};
