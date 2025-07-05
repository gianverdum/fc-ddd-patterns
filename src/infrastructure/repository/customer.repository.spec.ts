import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";

describe("CustomerRepository unit tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        // Arrange
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John Doe");
        const address = new Address("Main St", 1, "12345", "City");
        customer.changeAddress(address);
        await customerRepository.create(customer);
        // Act
        const customerModel = await CustomerModel.findOne({ where: { id: "123" } });
        // Assert
        expect(customerModel?.toJSON()).toStrictEqual({
            id: "123",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
        });
    });

    it("should update a customer", async () => {
        // Arrange
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John Doe");
        const address = new Address("Main St", 1, "12345", "City");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        customer.changeName("Jane Doe");
        const newAddress = new Address("Second St", 2, "54321", "New City");
        customer.changeAddress(newAddress);
        customer.addRewardPoints(100);
        customer.activate();

        // Act
        await customerRepository.update(customer);
        const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

        // Assert
        expect(customerModel?.toJSON()).toStrictEqual({
            id: "123",
            name: "Jane Doe",
            active: true,
            rewardPoints: 100,
            street: newAddress.street,
            number: newAddress.number,
            zipcode: newAddress.zip,
            city: newAddress.city,
        });
    });

    it("should find a customer by id", async () => {
        // Arrange
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John Doe");
        const address = new Address("Main St", 1, "12345", "City");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        // Act
        const foundCustomer = await customerRepository.find(customer.id);

        // Assert
        expect(customer).toStrictEqual(foundCustomer);
    });

    it("should find all customers", async () => {
        // Arrange
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("123", "John Doe");
        const address1 = new Address("Main St", 1, "12345", "City");
        customer1.changeAddress(address1);

        const customer2 = new Customer("456", "Jane Doe");
        const address2 = new Address("Second St", 2, "54321", "New City");
        customer2.changeAddress(address2);

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        // Act
        const customers = await customerRepository.findAll();

        // Assert
        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer1);
        expect(customers).toContainEqual(customer2);
    });
    it("should throw an error when customer not found", async () => {
        // Arrange
        const customerRepository = new CustomerRepository();

        // Act & Assert
        await expect(customerRepository.find("non-existing-id")).rejects.toThrow("Customer not found.");
    });
});