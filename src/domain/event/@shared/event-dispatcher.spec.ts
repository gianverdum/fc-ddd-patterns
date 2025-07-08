import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
    it("should register an event handler", () => {
        // Arrange
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        // Act
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        // Assert
        expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
        // Arrange
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        // Act
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        // Assert
        expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"].length).toBe(0);
    });

    it("should unregister all event handlers", () => {
        // Arrange
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        // Act
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();
        // Assert
        expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"]).toBeUndefined();
    });
});