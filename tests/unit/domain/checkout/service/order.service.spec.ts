import Order from "@src/domain/checkout/entity/order";
import OrderItem from "@src/domain/checkout/entity/order_item";
import OrderService from "@src/domain/checkout/service/order.service";
import Customer from "@src/domain/customer/entity/customer";


describe("Order service unit tests", () => {

    it("should get rewardPoints when placing an order", () => {
        // Arrange
        const customer = new Customer("c1", "Customer 1");
        const item1 = new OrderItem("i1", "p1", "Item 1", 100, 1);
        const item2 = new OrderItem("i2", "p2", "Item 2", 200, 2);
        // Act
        const order = OrderService.placeOrder(customer, [item1, item2]);
        // Assert
        expect(customer.rewardPoints).toBe(250);
        expect(order.total()).toBe(500);
    });

    it("should get total of all orders", () => {
        // Arrange
        const item1 = new OrderItem("i1", "p1", "Item 1", 100, 1);
        const item2 = new OrderItem("i2", "p2", "Item 2", 200, 2);

        const order = new Order("o1", "c1", [item1]);
        const order2 = new Order("o2", "c1", [item2]);
        // Act
        const total = OrderService.total([order, order2]);
        // Assert
        expect(total).toBe(500);

    });

    it("should throw error when placing an order with empty items", () => {
        // Arrange
        const customer = new Customer("c1", "Customer 1");
        // Act & Assert
        expect(() => OrderService.placeOrder(customer, [])).toThrow("Order must have at least one item.");
    });
});