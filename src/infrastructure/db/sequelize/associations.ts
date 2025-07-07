import OrderModel from "./model/order.model";
import OrderItemModel from "./model/order-item.model";
import CustomerModel from "./model/customer.model";
import ProductModel from "./model/product.model";

export function setupAssociations() {
  OrderModel.belongsTo(CustomerModel, {
    foreignKey: "customer_id",
    as: "customer",
  });

  OrderModel.hasMany(OrderItemModel, {
    foreignKey: "order_id",
    as: "items",
  });

  OrderItemModel.belongsTo(OrderModel, {
    foreignKey: "order_id",
    as: "order",
  });

  OrderItemModel.belongsTo(ProductModel, {
    foreignKey: "product_id",
    as: "product",
  });
}