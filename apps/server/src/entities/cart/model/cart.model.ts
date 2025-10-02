import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../shared/db/sequelize";

export class Cart extends Model {
  declare id: number;
  declare name: string;
  declare imageUrl: string;
  declare price: number;
  declare ingredients: string | null;
  declare toppings: string | null;
  declare type: string;
  declare size: number;
  declare quantity: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    toppings: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "cart",
    timestamps: true,
  }
);
