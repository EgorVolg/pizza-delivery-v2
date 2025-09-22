import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../shared/db/sequelize";

export class PizzaToppings extends Model {
  declare id: number;
  declare name: string;
  declare price: number;
  declare image: string;
}

PizzaToppings.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    tableName: "pizzatoppings",
    timestamps: false,
  }
);
