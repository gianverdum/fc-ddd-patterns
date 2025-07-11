import Order from "@src/domain/checkout/entity/order";
import OrderItem from "@src/domain/checkout/entity/order_item";

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
        const item1 = new OrderItem("1", "001", "Item 1", 100, 2);
        const item2 = new OrderItem("2", "002", "Item 2", 200, 3);
        const order = new Order("123", "123", [item1, item2]);
        // Act
        const total = order.total();
        // Assert
        expect(total).toBe(800);
    });

    it("should throw error when item quantity is less than or equal to zero", () => {
        // Arrange & Act & Assert
        expect(() => {
            const item1 = new OrderItem("1", "001", "Item 1", 100, 0);
            const order = new Order("123", "123", [item1]);
        }).toThrow("Quantity must be greater than zero.");
    });

});