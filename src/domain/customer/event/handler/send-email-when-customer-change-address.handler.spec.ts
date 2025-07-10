import SendEmailWhenCustomerChangeAddressHandler from "./send-email-when-customer-change-address.handler";
import CustomerChangedAddressEvent from "../customer-changed-address.event";
import EventDispatcher from "src/domain/@shared/event/event-dispatcher";

describe("SendEmailWhenCustomerChangeAddressHandler unit tests", () => {
  it("should log customer address change event", () => {
    // Arrange
    const consoleSpy = jest.spyOn(console, "log");
    const eventDispatcher = new EventDispatcher();
    const handler = new SendEmailWhenCustomerChangeAddressHandler();
    eventDispatcher.register("CustomerChangedAddressEvent", handler);
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

    // Act
    eventDispatcher.notify(event);

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(
      "Customer 123 - John Doe's address changed to: Av. Brasil, São Paulo, SP, 01234-567"
    );
  });
});