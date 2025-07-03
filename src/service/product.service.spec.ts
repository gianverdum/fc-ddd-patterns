import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () => {

    it("should change the prices of all products", () => {
        //Act
        const product1 = new Product("p1", "Product 1", 100);
        const product2 = new Product("p2", "Product 2", 200);
        const product3 = new Product("p3", "Product 3", 300);
        const products = [product1, product2, product3];
        //Arrange
        ProductService.increasePrice(products, 100);
        //Assert
        expect(product1.price).toBe(200);
        expect(product2.price).toBe(400);
        expect(product3.price).toBe(600);
    });
});