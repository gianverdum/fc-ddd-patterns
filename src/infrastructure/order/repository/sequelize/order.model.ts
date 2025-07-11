import CustomerModel from '@src/infrastructure/customer/repository/sequelize/customer.model';
import {
    Table,
    Model,
    PrimaryKey,
    Column,
    ForeignKey,
} from 'sequelize-typescript';
import OrderItemModel from './order-item.model';

@Table({
    tableName: 'orders',
    timestamps: false,
})
export default class OrderModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => CustomerModel)
    @Column({ allowNull: false })
    declare customer_id: string;

    declare customer?: CustomerModel;

    declare items?: OrderItemModel[];

    @Column({ allowNull: false })
    declare total: number;
}