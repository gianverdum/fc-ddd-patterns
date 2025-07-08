import SendEmailWhenCustomerChangeAddressHandler from "./send-email-when-customer-change-address.handler";
import CustomerChangedAddressEvent from "../customer-changed-address.event";

describe("SendEmailWhenCustomerChangeAddressHandler unit tests", () => {
  it("should log customer address change event", () => {
    // Arrange
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    const event = new CustomerChangedAddressEvent({
      id: "123",
      name: "John Doe",
      address: {
        street: "Av. Brasil",
        city: "São Paulo",
        state: "SP",
        zipCode: "01234-567",
      },
    });
    const handler = new SendEmailWhenCustomerChangeAddressHandler();

    // Act
    handler.handle(event);

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(
      "Customer 123 - John Doe's address changed to: Av. Brasil, São Paulo, SP, 01234-567"
    );

    // Cleanup
    consoleSpy.mockRestore();
  });
});