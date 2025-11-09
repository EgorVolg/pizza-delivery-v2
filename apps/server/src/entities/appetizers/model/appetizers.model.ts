import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../shared/db/sequelize";

export class Appetizers extends Model {
  declare id: number;
  declare name: string;
  declare price: number;
  declare imageUrl: string;
  declare description: string;
  declare categoryId: number;
  declare rating: number;
  declare popular: number;
  declare quantity: (number | string)[];
  declare weight: number[];
  declare createdAt: Date;
  declare updatedAt: Date;
}

Appetizers.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    imageUrl: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.TEXT },
    quantity: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
    weight: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
    rating: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    popular: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    ingredients: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
    type: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
    size: { type: DataTypes.INTEGER },
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
    tableName: "appetizers",
    timestamps: false,
  }
);
