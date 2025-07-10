import { v4 as uuid } from "uuid";
import OrderFactory from "./order.factory";

describe("Oder factory unit tests", () => {
    it("should create an order", () => {
        // Arrange
        const orderProps = {
            id: uuid(),
            customerId: uuid(),
            items: [
                {
                    id: uuid(),
                    name: "Product 1",
                    productId: uuid(),
                    quantity: 2,
                    price: 100,
                },
                {
                    id: uuid(),
                    name: "Product 2",
                    productId: uuid(),
                    quantity: 1,
                    price: 50,
                }
            ],
        };
        // Act
        const order = OrderFactory.create(orderProps);
        // Assert
        expect(order.id).toEqual(orderProps.id);
        expect(order.customerId).toEqual(orderProps.customerId);
        expect(order.items.length).toBe(2);
        expect(order.items[0].id).toEqual(orderProps.items[0].id);
        expect(order.items[0].name).toEqual(orderProps.items[0].name);
        expect(order.items[0].productId).toEqual(orderProps.items[0].productId);
        expect(order.items[0].quantity).toEqual(orderProps.items[0].quantity);
        expect(order.items[0].price).toEqual(orderProps.items[0].price);
        expect(order.items[1].id).toEqual(orderProps.items[1].id);
        expect(order.items[1].name).toEqual(orderProps.items[1].name);
        expect(order.items[1].productId).toEqual(orderProps.items[1].productId);
        expect(order.items[1].quantity).toEqual(orderProps.items[1].quantity);
        expect(order.items[1].price).toEqual(orderProps.items[1].price);
    });
});