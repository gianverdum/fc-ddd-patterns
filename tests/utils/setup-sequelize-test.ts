import { setupAssociations } from "@src/infrastructure/associations";
import { Sequelize } from "sequelize-typescript";

export async function setupSequelizeTest(models: any[]): Promise<Sequelize> {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
    sync: { force: true },
  });

  sequelize.addModels(models);
  setupAssociations();
  await sequelize.sync();

  return sequelize;
}