import CustomerModel from "@src/infrastructure/customer/repository/sequelize/customer.model";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "@src/infrastructure/product/repository/sequelize/product.model";


export function setupOrderAssociations() {
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