import { Sequelize, Dialect } from "sequelize";
import userModel from "./models/user.model";
import assignmentModel from "./models/assignment.model";
import gradeModel from "./models/grade.model";
import {
  DB_DIALECT,
  DB_HOST_POSTGRES,
  DB_NAME_SQLITE,
  DB_NAME_POSTGRES,
  DB_PASSWORD_POSTGRES,
  DB_PORT_POSTGRES,
  DB_USERNAME_POSTGRES,
} from "@/config";

const commonConfig = {
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
    underscored: true,
    freezeTableName: true,
  },
  pool: { min: 0, max: 5 },
  logQueryParameters: true,
  logging: (query: string, time?: number) =>
    console.info(`${time ?? 0}ms ${query}`),
  benchmark: true,
};

const sequelize = new Sequelize(
  DB_DIALECT?.toLocaleUpperCase() === "SQLITE"
    ? {
        dialect: DB_DIALECT as Dialect,
        storage: DB_NAME_SQLITE,
        ...commonConfig,
      }
    : {
        database: DB_NAME_POSTGRES,
        username: DB_USERNAME_POSTGRES,
        password: DB_PASSWORD_POSTGRES,
        host: DB_HOST_POSTGRES,
        port: parseInt(DB_PORT_POSTGRES ?? "5432", 10),
        dialect: DB_DIALECT as Dialect,
        ...commonConfig,
      }
);

// Test connection
sequelize.authenticate().then(
  () => console.info(`Database ${DB_DIALECT} connected successfully.`),
  (err) => console.error("Database connection failed:", err)
);

// Export models and Sequelize instance
export const DB = {
  User: userModel(sequelize),
  Assignment: assignmentModel(sequelize),
  Grade: gradeModel(sequelize),
  sequelize,
  Sequelize,
};
