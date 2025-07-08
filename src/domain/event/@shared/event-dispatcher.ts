import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
    private enventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

    getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
        return this.enventHandlers;
    }

    register(eventName: string, eventHandler: EventHandlerInterface): void {
        if(!this.enventHandlers[eventName]) {
            this.enventHandlers[eventName] = [];
        }
        this.enventHandlers[eventName].push(eventHandler);
    }
    unregister(eventName: string, eventHandler: EventHandlerInterface): void {
        if (this.enventHandlers[eventName]) {
            const index = this.enventHandlers[eventName].indexOf(eventHandler);
            if (index !== -1) {
                this.enventHandlers[eventName].splice(index, 1);
            }
        }
    }
    unregisterAll(): void {
        this.enventHandlers = {};
    }
    notify(event: EventInterface): void {
        const eventName = event.constructor.name;
        if(this.enventHandlers[eventName]) {
            this.enventHandlers[eventName].forEach((eventHandler) => {
                eventHandler.handle(event);
            });
        }
    }
}