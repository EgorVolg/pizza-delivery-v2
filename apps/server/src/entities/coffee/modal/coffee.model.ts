import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../shared/db/sequelize";

export class Coffee extends Model {
  declare id: number;
  declare name: string;
  declare imageUrl: string;
  declare price: number;
  declare description: string;
  declare ingredients: string[];
  declare type: number[];
  declare size: number;
  declare quantity: number[];
  declare weight: number[];
  declare popular: number;
  declare rating: number;
  declare category_id: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Coffee.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    imageUrl: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.TEXT },
    rating: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    popular: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    ingredients: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
    size: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
    type: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
    weight: { type: DataTypes.INTEGER, allowNull: true },
    quantity: { type: DataTypes.INTEGER, allowNull: true },
    category_id: {
      type: DataTypes.INTEGER,
      references: { model: "categories", key: "id" },
      onDelete: "CASCADE",
    },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize,
    tableName: "coffee",
    timestamps: false,
  }
);
