import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it("should throw error when ID is empty", () => {
        // Arrange & Act & Assert
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrow("ID is required.");
    });

    it("should throw error when customer ID is empty", () => {
        // Arrange & Act & Assert
        expect(() => {
            let order = new Order("123", "", []);
        }).toThrow("Customer ID is required.");
    });

    it("should throw error when items are empty", () => {
        // Arrange & Act & Assert
        expect(() => {
            let order = new Order("123", "123", []);
        }).toThrow("Items are required.");
    });

    it("should calculate total correctly", () => {
        // Arrange
        const item1 = new OrderItem("1", "Item 1", 100);
        const item2 = new OrderItem("2", "Item 2", 200);
        const order = new Order("123", "123", [item1, item2]);
        // Act
        const total = order.total();
        // Assert
        expect(total).toBe(300);
    });

});