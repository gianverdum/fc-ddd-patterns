import Order from "src/domain/checkout/entity/order";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import OrderRepositoryInterface from "src/domain/checkout/repository/order-repository.interface";
import OrderItem from "src/domain/checkout/entity/order_item";

export default class OrderRepository implements OrderRepositoryInterface {
    
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                product_id: item.productId,
            })),
        },
        {
            include: [{ model: OrderItemModel, as: "items" }],
        }
    );
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update(
            {
                customer_id: entity.customerId,
                total: entity.total(),
            },
            {
                where: { id: entity.id },
            }
        );
    
        // Remove itens antigos
        await OrderItemModel.destroy({
            where: { order_id: entity.id },
        });
    
        // Cria os novos itens
        await Promise.all(
            entity.items.map((item) =>
                OrderItemModel.create({
                    id: item.id,
                    order_id: entity.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    product_id: item.productId,
                })
            )
        );
    }

    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({
            where: { id },
            include: [{ model: OrderItemModel, as: "items" }],
        });

        if (!orderModel) {
            throw new Error(`Order whith id ${id} not found`);
        }

        const items = (orderModel.items as OrderItemModel[]).map((item) => {
            return new OrderItem(
                item.id,
                item.product_id,
                item.name,
                item.price,
                item.quantity
            );
        });

        return new Order(
            orderModel.id,
            orderModel.customer_id,
            items
        );
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({
            include: [{ model: OrderItemModel, as: "items" }],
        });

        return orderModels.map((orderModel) => {
            const items = (orderModel.items as OrderItemModel[]).map((item) => {
                return new OrderItem(
                    item.id,
                    item.product_id,
                    item.name,
                    item.price,
                    item.quantity
                );
            });

            return new Order(
                orderModel.id,
                orderModel.customer_id,
                items
            );
        });
    }
}