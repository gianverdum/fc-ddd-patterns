import EventHandlerInterface from "@src/domain/@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendEmailWhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {
        console.log(`This is the first console.log of the event: ${event.eventData.name}`);
    }
}