import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer("123", "John Doe");
const address = new Address("Main St", 123, "12345", "Anytown");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "001", "Item 1", 100, 2);
const item2 = new OrderItem("2", "002", "Item 2", 200, 3);
const order = new Order("1", "123", [item1, item2]);