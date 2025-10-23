import express, { Request, Response } from "express";
import { Cart } from "../entities/cart/model/cart.model";
import { Pizza } from "../entities/pizzas/model/pizza.model";

export const getCartItems = async (_req: Request, res: Response) => {
  try {
    const items = await Cart.findAll();

    const quantity = items.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    res.json({
      data: items,
      quantity,
      totalPrice: totalPrice,
    });
  } catch (err) {
    console.error("Ошибка при получении корзины:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const addCartItem = async (req: Request, res: Response) => {
  try {
    const existingItem = await Cart.findOne({
      where: {
        name: req.body.name,
        toppings: req.body.toppings,
        type: req.body.type,
        size: req.body.size,
      },
    });

    if (existingItem) {
      existingItem.quantity += req.body.quantity || 1;
      await existingItem.save();
      res.json(existingItem);
      return;
    }

    const newItem = await Cart.create({
      ...req.body,
      quantity: req.body.quantity || 1,
    });
    res.status(201).json(newItem);
  } catch (err) {
    console.error("Ошибка при добавлении в корзину:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteCartItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await Cart.destroy({
      where: { id },
    });

    if (deleted) {
      res.json({ message: "Товар удалён из корзины" });
    } else {
      res.status(404).json({ error: "Товар не найден" });
    }
  } catch (err) {
    console.error("Ошибка при удалении из корзины:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteCartItems = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const pizza = await Pizza.findOne({
      where: { id: parseInt(id) },
    });

    if (!pizza) {
      res.status(404).json({ error: "Пицца не найдена" });
      return;
    }

    const deleted = await Cart.destroy({
      where: { name: pizza.name },
    });

    if (deleted > 0) {
      res.json({ message: "Товары удалёны из корзины" });
    } else {
      res.status(404).json({ error: "Товары не найдены в корзине" });
    }
  } catch (error) {
    console.error("Ошибка при удалении из корзины:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await Cart.update(req.body, {
      where: { id },
    });

    if (updated) {
      res.json({ message: "Товар обновлен в корзине" });
    } else {
      res.status(404).json({ error: "Товар не найден" });
    }
  } catch (err) {
    console.error("Ошибка при обновлении товара в корзине:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const router = express.Router();

// GET /cart — получить все записи
router.get("/cart", getCartItems);

// POST /cart — добавить новую запись
router.post("/cart", addCartItem);

// DELETE /cart/:id — удалить запись по id
router.delete("/cart/:id", deleteCartItem);

// PUT /cart/:id — обновить запись по id
router.put("/cart/:id", updateCartItem);

export default router;
