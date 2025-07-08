import SendEmailWhenCustomerIsCreatedHandler2 from "./send-email-when-customer-is-created.handler2";
import CustomerCreatedEvent from "../customer-created.event";

describe("SendEmailWhenCustomerIsCreatedHandler2 unit tests", () => {
  it("should log customer creation event", () => {
    // Arrange
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    const event = new CustomerCreatedEvent({
      id: "123",
      name: "John Doe",
    });
    const handler = new SendEmailWhenCustomerIsCreatedHandler2();

    // Act
    handler.handle(event);

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(
      "This is the second console.log of the event: John Doe"
    );

    // Cleanup
    consoleSpy.mockRestore();
  });
});
