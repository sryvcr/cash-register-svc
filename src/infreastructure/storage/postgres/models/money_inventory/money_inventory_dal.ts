import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: process.env.MONEY_INVENTORY_TABLE,
    timestamps: false,
    paranoid: false,
    underscored: false,
    freezeTableName: true
})


class MoneyInventoryDal extends Model {

    @Column({
        type: DataType.BIGINT,
        field: 'id',
        primaryKey: true,
    })
    id!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'coin',
    })
    coin!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'total',
    })
    total!: number;

}

export { MoneyInventoryDal };
