import ProductFactory from "@src/domain/product/factory/product.factory";

describe("Product factory unit tests", () => {
    it("should create a product type a", () => {
        // Arrange & Act
        const product = ProductFactory.create("a", "Product A", 100);
        // Assert
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(100);
        expect(product.constructor.name).toBe("Product");
    });
    it("should create a product type b", () => {
        // Arrange & Act
        const product = ProductFactory.create("b", "Product B", 100);
        // Assert
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product B");
        expect(product.price).toBe(200);
        expect(product.constructor.name).toBe("ProductB");
    });
    it("should throw an error when product type is invalid", () => {
        // Arrange & Act & Assert
        expect(() => ProductFactory
            .create("c", "Product C", 100))
            .toThrow("Invalid product type");
    });
});