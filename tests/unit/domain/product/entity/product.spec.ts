import Product from "@src/domain/product/entity/product";

describe("Product unit tests", () => {

    it("should throw an error when id is empty", () => {
        // Arrange & Act & Assert
        expect(() => {

            const product = new Product("", "Product 1", 100);

        }).toThrow("Id is required");
    });

    it("should throw an error when name is empty", () => {
        // Arrange & Act & Assert
        expect(() => {

            const product = new Product("123", "", 100);

        }).toThrow("Name is required");
    });

    it("should throw an error when price is negative", () => {
        // Arrange & Act & Assert
        expect(() => {

            const product = new Product("123", "Product 1", -100);

        }).toThrow("Price must be greater than or equal to 0");
    });

    it("should change name", () => {
        // Arrange
        const product = new Product("123", "Product 1", 100);

        // Act
        product.changeName("Product 2");

        // Assert
        expect(product.name).toBe("Product 2");
    });

    it("should change price", () => {
        // Arrange
        const product = new Product("123", "Product 1", 100);

        // Act
        product.changePrice(150);

        // Assert
        expect(product.price).toBe(150);
    });

});