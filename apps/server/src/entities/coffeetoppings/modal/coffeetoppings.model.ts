import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../shared/db/sequelize";

export class Coffeetoppings extends Model {
  declare id: number;
  declare name: string;
  declare price: number;
  declare imageUrl: string;
}

Coffeetoppings.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    imageUrl: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    tableName: "coffeetoppings",
    timestamps: false,
  }
);
