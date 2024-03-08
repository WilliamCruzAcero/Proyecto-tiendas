import { Model, type InferAttributes, type InferCreationAttributes, type CreationOptional, DataTypes } from "sequelize";
import connection from "../database/connection";

export class DatabaseUser extends Model<InferAttributes<DatabaseUser>, InferCreationAttributes<DatabaseUser>> {
    public id!: CreationOptional<number>;
    public name!: string;
    declare lastname: string;
    declare email: string;
    declare password: string;
    declare birthdate: Date;
    declare role: string;
    declare active: boolean;
    declare createdAt?: CreationOptional<Date>;
    declare updatedAt?: CreationOptional<Date>;
}

DatabaseUser.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: true
        },
        lastname: {
            type: new DataTypes.STRING(128),
            allowNull: true
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: true
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: true
        },
        birthdate: DataTypes.DATE,
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        role: {
            type: new DataTypes.STRING(128),
            allowNull: true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize: connection,
        tableName: 'users'
    }
);