import Product from "@src/domain/product/entity/product";
import ProductModel from "@src/infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "@src/infrastructure/product/repository/sequelize/product.repository";
import { Sequelize } from "sequelize-typescript";

describe("Product repository unit tests", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });
    
    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        // Arrange
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        
        await productRepository.create(product);
        // Act
        const productModel = await ProductModel.findOne({ where: { id: "1" } });
        // Assert
        expect(productModel?.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100
        });
        
    });

    it("should update a product", async () => {
        // Arrange
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" } });
        
        expect(productModel?.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100
        });
        
        // Act
        product.changeName("Updated Product");
        product.changePrice(150);

        await productRepository.update(product);
        
        const updatedProductModel = await ProductModel.findOne({ where: { id: "1" } });
        
        // Assert
        expect(updatedProductModel?.toJSON()).toStrictEqual({
            id: "1",
            name: "Updated Product",
            price: 150
        });
    });

    it("should find a product", async () => {
        // Arrange
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        
        await productRepository.create(product);
        
        // Act
        const productModel = await ProductModel.findOne({ where: { id: "1" } });

        const foundProduct = await productRepository.find("1");
        
        // Assert
        expect(productModel?.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price,
        });
    });

    it("should find all products", async () => {
        // Arrange
        const productRepository = new ProductRepository();
        const product1 = new Product("1", "Product 1", 100);
        await productRepository.create(product1);

        const product2 = new Product("2", "Product 2", 200);
        await productRepository.create(product2);
        // Act
        const foundProducts = await productRepository.findAll();
        const products = [product1, product2];
        // Assert
        expect(products).toEqual(foundProducts);
    });

    it("should throw an error when product not found", async () => {
        // Arrange
        const productRepository = new ProductRepository();
        
        // Act & Assert
        await expect(productRepository.find("non-existing-id"))
            .rejects
            .toThrow("Product with id non-existing-id not found");
    });
});