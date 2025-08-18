import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../shared/db/sequelize";

export class Pizza extends Model {
  declare id: number;
  declare name: string;
  declare imageUrl: string;
  declare price: number;
  declare description: string;
  declare ingredients: string[];
  declare size: number[];
  declare type: number[];
  declare category_id: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Pizza.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    imageUrl: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.TEXT },
    ingredients: { type: DataTypes.ARRAY(DataTypes.STRING) },
    size: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
    type: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
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
    tableName: "pizzas",
    timestamps: false, 
  }
);
