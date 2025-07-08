import EventHandlerInterface from "src/domain/@shared/event/event-handler.interface";
import CustomerChangedAddressEvent from "../customer-changed-address.event";

export default class SendEmailWhenCustomerChangeAddressHandler implements EventHandlerInterface<CustomerChangedAddressEvent> {
    handle(event: any): void {
        console.log(`Customer ${event.eventData.id} - ${event.eventData.name}'s address changed to: ` +
        `${event.eventData.address.street}, ${event.eventData.address.city}, ${event.eventData.address.state}, ${event.eventData.address.zipCode}`
        );
    }
}