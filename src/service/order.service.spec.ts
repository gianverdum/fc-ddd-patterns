import Order from "../entity/order";
import OrderItem from "../entity/order_item";

describe("Order service unit tests", () => {

    it("should get total of all orders", () => {
        // Arrange
        const item1 = new OrderItem("i1", "Item 1", "p1", 100, 1);
        const item2 = new OrderItem("i2", "Item 2", "p2", 200, 2);

        const order = new Order("o1", "c1", [item1]);
        const order2 = new Order("o2", "c1", [item2]);
        // Act
        const total = OrderService.total([order, order2]);
        // Assert
        expect(total).toBe(500);

    });
});