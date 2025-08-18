"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// pizzas.controller.test.ts
const pizzas_controller_1 = require("./pizzas.controller");
const pizza_model_1 = require("../entities/pizzas/model/pizza.model");
const jest_mock_extended_1 = require("jest-mock-extended");
jest.mock("../entities/pizzas/model/pizza.model", () => ({
    Pizza: { findAll: jest.fn() },
}));
describe("getPizzas", () => {
    const findAll = pizza_model_1.Pizza.findAll;
    const mockReq = () => ({});
    const mockRes = () => (0, jest_mock_extended_1.mockDeep)({ status: jest.fn().mockReturnThis() });
    beforeEach(() => {
        (0, jest_mock_extended_1.mockReset)(findAll);
        jest.clearAllMocks();
    });
    it("возвращает пиццы без таймстемпов при успешном запросе", async () => {
        const pizzas = [
            pizza_model_1.Pizza.build({
                id: 1,
                name: "Пикантные колбаски",
                ingredients: "Классические колбаски...",
                price: 279,
                imageUrl: "https://...",
                type: [2],
                size: [30],
                description: "...",
                category_id: 1,
            }),
        ];
        findAll.mockResolvedValue(pizzas);
        findAll.mockResolvedValue(pizzas);
        const req = mockReq();
        const res = mockRes();
        await (0, pizzas_controller_1.getPizzas)(req, res);
        expect(findAll).toHaveBeenCalledWith({
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        expect(res.json).toHaveBeenCalledWith(pizzas);
    });
    it("возвращает пустой массив, если пицц нет", async () => {
        findAll.mockResolvedValue([]);
        const req = mockReq();
        const res = mockRes();
        await (0, pizzas_controller_1.getPizzas)(req, res);
        expect(res.json).toHaveBeenCalledWith([]);
    });
    it("возвращает 500, если Pizza.findAll выбрасывает ошибку", async () => {
        const error = new Error("DB failure");
        findAll.mockRejectedValue(error);
        const consoleSpy = jest.spyOn(console, "error").mockImplementation();
        const req = mockReq();
        const res = mockRes();
        await (0, pizzas_controller_1.getPizzas)(req, res);
        expect(consoleSpy).toHaveBeenCalledWith(error);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Server error" });
        consoleSpy.mockRestore();
    });
});
