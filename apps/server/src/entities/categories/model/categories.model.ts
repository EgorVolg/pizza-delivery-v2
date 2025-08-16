import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../shared/db/sequelize";

export class Category extends Model {
  declare id: number;
  declare name: string;
}

Category.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: "categories",
    timestamps: false, 
  }
);
