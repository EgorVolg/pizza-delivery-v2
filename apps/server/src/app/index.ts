import express from "express";
import categoryRoutes from "../routes/categories.routes";
import pizzasRoutes from "../routes/pizzas.routes";
import ingredientRoutes from "../routes/ingredients.routes";
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

app.use("/api", pizzasRoutes);
app.use("/api", categoryRoutes);
app.use("/api", ingredientRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
