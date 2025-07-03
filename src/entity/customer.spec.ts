import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when ID is empty", () => {
        
        expect(() => {
            let customer = new Customer("", "John Doe");
        }).toThrow("ID is required.");
    });

    it("should throw error when name is empty", () => {
        
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrow("Name is required.");
    });

    it("should change name", () => {
        //Arrange
        const customer = new Customer("123", "John Doe");
        //Act
        customer.changeName("Jane Doe");
        //Assert
        expect(customer.name).toBe("Jane Doe");
    });

    it("should activate customer", () => {
        //Arrange
        const customer = new Customer("123", "John Doe");
        const address = new Address("Main St", 123, "12345", "Anytown");
        customer.Address = address;
        //Act
        customer.activate();
        //Assert
        expect(customer.isActive()).toBe(true);
    });

    it("should not activate customer without address", () => {
        //Arrange
        const customer = new Customer("123", "John Doe");
        //Act & Assert
        expect(() => {
            customer.activate();
        }).toThrow("Cannot activate customer without an address.");
    });

    it("should deactivate customer", () => {
        //Arrange
        const customer = new Customer("123", "John Doe");
        //Act
        customer.deactivate();
        //Assert
        expect(customer.isActive()).toBe(false);
    });
});