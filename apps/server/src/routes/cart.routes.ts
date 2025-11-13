import express, { Request, Response } from "express";
import { Cart_items } from "../entities/cart/model/cart.model";
import { Pizza } from "../entities/pizzas/model/pizza.model";

export const getCartItems = async (_req: Request, res: Response) => {
  try {
    const items = await Cart_items.findAll();

    const quantity = items.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = items.reduce(
      (total, item) => total + (item.price || 0) * item.quantity,
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
    const existingItem = await Cart_items.findOne({
      where: {
        product_id: req.body.id,
        cart_id: req.body.cart_id || "550e8400-e29b-41d4-a716-446655440000", // Default cart_id if not provided
        name: req.body.name,
        weight: req.body.weight,
        type: req.body.type,
        size: req.body.size, 
        ingredients: req.body.ingredients,
        productQuantity: req.body.productQuantity,
        toppings: req.body.toppings,
      },
    });

    if (existingItem) {
      existingItem.quantity += req.body.quantity || 1;
      await existingItem.save();
      res.json(existingItem);
      return;
    }

    const newItem = await Cart_items.create({
      product_id: req.body.id,
      cart_id: req.body.cart_id || "550e8400-e29b-41d4-a716-446655440000", // Default cart_id if not provided
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      type: req.body.type,
      size: req.body.size,
      weight: req.body.weight,
      quantity: req.body.quantity,
      productQuantity: req.body.productQuantity,
      ingredients: req.body.ingredients,
      toppings: req.body.toppings,
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

    const deleted = await Cart_items.destroy({
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

    const deleted = await Cart_items.destroy({
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
    const [updated] = await Cart_items.update(req.body, {
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
