import { Sequelize } from "sequelize";

const db = new Sequelize("node", "demo", "demo", {
  host: "localhost",
  dialect: "postgres",
  // logging: false,
});

export default db;
