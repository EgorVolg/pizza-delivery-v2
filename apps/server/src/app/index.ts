import express from "express";
import categoryRoutes from "../routes/categories.routes";
import ingredientRoutes from "../routes/ingredients.routes";
import pizzaToppingsRoutes from "../routes/pizzatoppings.routes";
import productsRoutes from "../routes/products.routes";
import cartRoutes from "../routes/cart.routes";
import appetizersRoutes from "../routes/appetizer.routes";
import romanPizzasRoutes from "../routes/romanpizzas.routes";
import coffeesRoutes from "../routes/coffees.routes";
import Coffeetoppings from "../routes/coffeetoppings.routes";
import "../entities/cart/model/cart.model";

import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", productsRoutes);
app.use("/api", categoryRoutes);
app.use("/api", ingredientRoutes);
app.use("/api", pizzaToppingsRoutes);
app.use("/api", appetizersRoutes);
app.use("/api", romanPizzasRoutes);
app.use("/api", cartRoutes);
app.use("/api", coffeesRoutes);
app.use("/api", Coffeetoppings);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
