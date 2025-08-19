import type { Request, Response } from "express";
import { Pizza } from "../../entities/pizzas/model/pizza.model";
import { getPizzas } from "../pizzas.routes";

jest.mock("../../entities/pizzas/model/pizza.model", () => ({
  Pizza: { findAll: jest.fn() },
}));

describe("getPizzas", () => {
  const findAll = Pizza.findAll as jest.Mock;

  afterEach(() => jest.clearAllMocks());

  const mockReq = {} as Request;
  const mockRes = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it("возвращает пиццы без лишних полей", async () => {
    const pizzas = [
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
    ];

    findAll.mockResolvedValue(pizzas);

    const res = mockRes();
    await getPizzas(mockReq, res);

    expect(findAll).toHaveBeenCalledWith({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    expect(res.json).toHaveBeenCalledWith(pizzas);
  });

  it("возвращает 500 и логирует ошибку при падении БД", async () => {
    const error = new Error("DB failure");
    findAll.mockRejectedValue(error);

    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    const res = mockRes();

    await getPizzas(mockReq, res);

    expect(consoleSpy).toHaveBeenCalledWith(error);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Server error" });

    consoleSpy.mockRestore();
  });
});
