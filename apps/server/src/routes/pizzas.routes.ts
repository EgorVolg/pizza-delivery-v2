import express from "express"; 
import { getPizzas } from "../controllers/pizzas.controller";

const router = express.Router();
router.get("/pizzas", getPizzas);

export default router;
