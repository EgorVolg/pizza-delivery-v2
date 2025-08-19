import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../shared/db/sequelize";

export class Ingredient extends Model {
  declare id: number;
  declare name: string;
}

Ingredient.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: "ingredients",
    timestamps: false,
  }
);
