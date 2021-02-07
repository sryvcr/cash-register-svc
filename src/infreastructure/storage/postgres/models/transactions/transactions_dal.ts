import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: process.env.TRANSACTIONS_TABLE,
    timestamps: false,
    paranoid: false,
    underscored: false,
    freezeTableName: true
})


class TransactionsDal extends Model {

    @Column({
        type: DataType.STRING,
        field: 'id',
        primaryKey: true,
    })
    id!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'amount',
    })
    amount!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'type',
    })
    type!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 0,
        field: 'created_at',
    })
    created_at!: string;

    @Column({
        type: DataType.JSON,
        allowNull: true,
        field: 'coins',
    })
    coins!: any;

}

export { TransactionsDal };
