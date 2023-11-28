import type { BelongsToGetAssociationMixin, CreationOptional,  ForeignKey, InferAttributes, InferCreationAttributes } from "sequelize";
import {DataTypes, Model} from 'sequelize'
import type { DatabaseProduct } from "../product/model";
import connection from "../database/connection";

export class DatabaseInventory extends Model<InferAttributes<DatabaseInventory>, InferCreationAttributes<DatabaseInventory>> {
  declare id: CreationOptional<number>;
  declare product: ForeignKey<number>;
  declare price: number;
  declare stock: number;
  declare expiration?: string;
  declare store: number;
  declare active: boolean;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getProduct: BelongsToGetAssociationMixin<DatabaseProduct>;
}

DatabaseInventory.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
        allowNull: false
    }, 
    store: {
      type: DataTypes.INTEGER,
        allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    expiration: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    },
    {
      sequelize: connection,
      tableName: 'inventories'
  }
);