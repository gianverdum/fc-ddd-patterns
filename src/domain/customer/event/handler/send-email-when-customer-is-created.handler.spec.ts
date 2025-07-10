import SendEmailWhenCustomerIsCreatedHandler from "./send-email-when-customer-is-created.handler";
import CustomerCreatedEvent from "../customer-created.event";
import EventDispatcher from "src/domain/@shared/event/event-dispatcher";

describe("SendEmailWhenCustomerIsCreatedHandler unit tests", () => {
  it("should log customer creation event", () => {
    // Arrange
    const consoleSpy = jest.spyOn(console, "log");
    const eventDispatcher = new EventDispatcher();
    const handler = new SendEmailWhenCustomerIsCreatedHandler();
    eventDispatcher.register("CustomerCreatedEvent", handler);
    const event = new CustomerCreatedEvent({
      id: "123",
      name: "John Doe",
    });

    // Act
    eventDispatcher.notify(event);

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(
      "This is the first console.log of the event: John Doe"
    );
  });
});
