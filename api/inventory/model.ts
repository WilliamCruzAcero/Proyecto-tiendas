import { Model, type BelongsToGetAssociationMixin, type CreationOptional,  type ForeignKey, type InferAttributes, type InferCreationAttributes, DataTypes } from "sequelize";
import type { DatabaseProduct } from "../product/model";
import connection from "../database/connection";

export class DatabaseInventory extends Model<InferAttributes<DatabaseInventory>, InferCreationAttributes<DatabaseInventory>> {
  declare id: CreationOptional<number>;
  declare product: ForeignKey<number>;
  declare price: number;
  declare stock: number;
  declare expiration: Date;
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
    expiration: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    },
    {
      sequelize: connection,
      tableName: 'inventories'
  }
);