import express, { Request, Response } from "express";
import { Cart } from "../entities/cart/model/cart.model";

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
    const newItem = await Cart.create(req.body);
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
