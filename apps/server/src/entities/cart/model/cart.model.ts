import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../shared/db/sequelize";

export class Cart_items extends Model {
  declare id: number;
  declare product_id: number;
  declare cart_id: string;
  declare name: string;
  declare imageUrl: string;
  declare price: number;
  declare type: string | null;
  declare size: string | null;
  declare weight: string | null;
  declare ingredients: string | null;
  declare quantity: number;
  declare productQuantity: number;
  declare toppings: string | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Cart_items.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "product_id",
    },
    cart_id: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "cart_id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name",
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "imageUrl",
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "price",
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "weight",
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "type",
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "size",
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "ingredients",
    },
    productQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "productQuantity",
    },
    toppings: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "toppings",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      field: "quantity",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "createdAt",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "updatedAt",
    },
  },
  {
    sequelize,
    tableName: "cart_items",
    timestamps: true,
  }
);
