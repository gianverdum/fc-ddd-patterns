import RepositoryInterface from "src/domain/@shared/repository/repository-interface";
import Order from "../entity/order";


export default interface OrderRepositoryInterface extends RepositoryInterface<Order> {}