import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../shared/db/sequelize";
import { UUID } from "crypto";

export class Carts extends Model {
  declare id: number;
  declare user_id: UUID;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Carts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "user_id",
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
    tableName: "carts",
    timestamps: true,
  },
);
