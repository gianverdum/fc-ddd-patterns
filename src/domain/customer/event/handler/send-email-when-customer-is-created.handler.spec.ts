import SendEmailWhenCustomerIsCreatedHandler from "./send-email-when-customer-is-created.handler";
import CustomerCreatedEvent from "../customer-created.event";

describe("SendEmailWhenCustomerIsCreatedHandler unit tests", () => {
  it("should log customer creation event", () => {
    // Arrange
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    const event = new CustomerCreatedEvent({
      id: "123",
      name: "John Doe",
    });
    const handler = new SendEmailWhenCustomerIsCreatedHandler();

    // Act
    handler.handle(event);

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(
      "This is the first console.log of the event: John Doe"
    );

    // Cleanup
    consoleSpy.mockRestore();
  });
});
