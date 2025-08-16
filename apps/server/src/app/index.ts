import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { listCategories } from "../controllers/category.controller";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/api/pizzas", (_req, res) => {
  res.json([]);
});

app.get("/api/categories", listCategories);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
