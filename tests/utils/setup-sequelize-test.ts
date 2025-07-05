import { Sequelize } from "sequelize-typescript";

export const setupSequelizeTest = (models: any[]) => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels(models);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    return () => sequelize;
};