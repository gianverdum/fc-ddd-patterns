import Order from "@src/domain/checkout/entity/order";
import OrderItem from "@src/domain/checkout/entity/order_item";
import Customer from "@src/domain/customer/entity/customer";
import Address from "@src/domain/customer/value-object/address";
import Product from "@src/domain/product/entity/product";
import CustomerModel from "@src/infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "@src/infrastructure/customer/repository/sequelize/customer.repository";
import OrderItemModel from "@src/infrastructure/order/repository/sequelize/order-item.model";
import OrderModel from "@src/infrastructure/order/repository/sequelize/order.model";
import OrderRepository from "@src/infrastructure/order/repository/sequelize/order.repository";
import ProductModel from "@src/infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "@src/infrastructure/product/repository/sequelize/product.repository";
import { setupSequelizeTest } from "@tests/utils/setup-sequelize-test";
import { Sequelize } from "sequelize-typescript";

describe("OrderRepository unit tests", () => {
    let sequelize: Sequelize;
    
        beforeEach(async () => {
            sequelize = await setupSequelizeTest([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        });
    
        afterEach(async () => {
            await sequelize.close();
        });

    it("should create a new order", async () => {
        // Arrange
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
        // Act
        await orderRepository.create(order)

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: [{ model: OrderItemModel, as: "items" }]
        });
        // Assert
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
                    order_id: order.id,
                    product_id: orderItem.productId,
                },
            ],
        });
    });

    it("should update an existing order", async () => {
        // Arrange
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John Doe");
        const address = new Address("Street", 123, "123456", "city");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        const product2 = new Product("456", "Product 2", 200);
        await productRepository.create(product);
        await productRepository.create(product2);

        const orderItem1 = new OrderItem(
            "123",
            product.id,
            product.name,
            product.price,
            2
        );
        const order = new Order("123", customer.id, [orderItem1]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);
        // Act
        const orderItem2 = new OrderItem(
            "456",
            product2.id,
            product2.name,
            product2.price,
            3
        );
        order.changeItems([orderItem1, orderItem2]);
        await orderRepository.update(order);

        const updatedOrderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: [{ model: OrderItemModel, as: "items" }]
        });
        // Assert
        expect(updatedOrderModel?.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem1.id,
                    name: orderItem1.name,
                    price: orderItem1.price,
                    quantity: orderItem1.quantity,
                    order_id: order.id,
                    product_id: orderItem1.productId,
                },
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    quantity: orderItem2.quantity,
                    order_id: order.id,
                    product_id: orderItem2.productId,
                },
            ],
        });
    });

    it("should find an order by id", async () => {
        // Arrange
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
        await orderRepository.create(order);
        // Act
        const foundOrder = await orderRepository.find(order.id);
        // Assert
        expect(foundOrder).toStrictEqual(order);
    });

    it("should throw an error when order not found", async () => {
        // Arrange
        const orderRepository = new OrderRepository();
        // Act & Assert
        await expect(orderRepository.find("non-existing-id")).rejects.toThrow(
            "Order whith id non-existing-id not found"
        );
    }
    );

    it("should find all orders", async () => {
        // Arrange
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John Doe");
        const address = new Address("Street", 123, "123456", "city");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product1 = new Product("123", "Product 1", 100);
        const product2 = new Product("456", "Product 2", 200);
        await productRepository.create(product1);
        await productRepository.create(product2);

        const orderItem1 = new OrderItem(
            "123",
            product1.id,
            product1.name,
            product1.price,
            2
        );
        const orderItem2 = new OrderItem(
            "456",
            product2.id,
            product2.name,
            product2.price,
            3
        );

        const order1 = new Order("123", customer.id, [orderItem1]);
        const order2 = new Order("456", customer.id, [orderItem2]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order1);
        await orderRepository.create(order2);
        // Act
        const orders = await orderRepository.findAll();
        // Assert
        expect(orders).toHaveLength(2);
        expect(orders).toContainEqual(order1);
        expect(orders).toContainEqual(order2);
    });
});