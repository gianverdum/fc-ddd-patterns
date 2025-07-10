import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit tests", () => {
    it("should create a customer", () => {
        // Arrange & Act
        const customer = CustomerFactory.create("Jhon Doe");
        // Assert
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Jhon Doe");
        expect(customer.address).toBeUndefined();
    });
    it("should create a customer with an address", () => {
        // Arrange & Act
        const address = new Address("Street 1", 123, "Zipcode 12345", "City 1");
        const customer = CustomerFactory.createWithAddress("Jane Doe", address);
        // Assert
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Jane Doe");
        expect(customer.address).toBe(address);
    });
});