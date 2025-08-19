import { getCategories } from "./category.controller";
import { Category } from "../entities/categories/model/categories.model";
import type { Request, Response } from "express";

jest.mock("../entities/categories/model/categories.model", () => ({
  Category: { findAll: jest.fn() },
}));

describe("getCategories", () => {
  const findAll = Category.findAll as jest.Mock;

  afterEach(() => jest.clearAllMocks());

  const mockReq = {} as Request;
  const mockRes = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it("возвращает категории без лишних полей", async () => {
    const categories = [
      { id: 1, name: "Pizza" },
      { id: 2, name: "Drinks" },
    ];
    findAll.mockResolvedValue(categories);

    const res = mockRes();
    await getCategories(mockReq, res);

    expect(findAll).toHaveBeenCalledWith({ attributes: ["id", "name"] });
    expect(res.json).toHaveBeenCalledWith(categories);
  });

  it("возвращает 500 и логирует ошибку при падении БД", async () => {
    const error = new Error("DB failure");
    findAll.mockRejectedValue(error);

    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    const res = mockRes();

    await getCategories(mockReq, res);

    expect(consoleSpy).toHaveBeenCalledWith(error);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Server error" });

    consoleSpy.mockRestore();
  });
});
