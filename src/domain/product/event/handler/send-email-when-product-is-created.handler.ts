import EventHandlerInterface from "@src/domain/@shared/event/event-handler.interface";
import ProductCreatedEvent from "../product-created.event";


export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
    handle(event: ProductCreatedEvent): void {
        console.log(`Sending an email to ...`);
    }
}