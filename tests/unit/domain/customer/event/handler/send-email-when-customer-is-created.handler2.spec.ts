import EventDispatcher from "@src/domain/@shared/event/event-dispatcher";
import CustomerCreatedEvent from "@src/domain/customer/event/customer-created.event";
import SendEmailWhenCustomerIsCreatedHandler2 from "@src/domain/customer/event/handler/send-email-when-customer-is-created.handler2";

describe("SendEmailWhenCustomerIsCreatedHandler2 unit tests", () => {
  it("should log customer creation event", () => {
    // Arrange
    const consoleSpy = jest.spyOn(console, "log");
    const eventDispatcher = new EventDispatcher();
        const handler = new SendEmailWhenCustomerIsCreatedHandler2();
        eventDispatcher.register("CustomerCreatedEvent", handler);
    const event = new CustomerCreatedEvent({
      id: "123",
      name: "John Doe",
    });
    // Act
    eventDispatcher.notify(event);
    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(
      "This is the second console.log of the event: John Doe"
    );
  });
});
