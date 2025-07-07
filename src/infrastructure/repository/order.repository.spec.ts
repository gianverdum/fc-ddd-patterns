import { setupSequelizeTest } from "@tests/utils/setup-sequelize-test";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import Customer from "src/domain/entity/customer";
import Address from "src/domain/entity/address";
import ProductRepository from "./product.repository";
import Product from "src/domain/entity/product";
import OrderItem from "src/domain/entity/order_item";
import Order from "src/domain/entity/order";

describe("OrderRepository unit tests", () => {
    const getSequelize = setupSequelizeTest([CustomerModel, OrderModel, OrderItemModel, ProductModel]);

    it("should create a new order", async () => {
        const sequelize = getSequelize();

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John Doe");
        const address = new Address("Street", 123, "123456", "city");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "123",
            product.id,
            product.name,
            product.price,
            2
        );

        const order = new Order("123", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order)

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"]
        });

        expect(orderModel?.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id
                },
            ],
        });
    });
});