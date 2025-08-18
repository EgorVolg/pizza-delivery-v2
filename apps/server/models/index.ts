// // apps/server/models/index.test.ts
// import { readdirSync } from "fs";
// import path from "path";
// import { Sequelize, DataTypes } from "sequelize";
// import { EnvConfig } from "../config/config.type";
// import { SequelizeModel, Db } from "./index";

// describe("SequelizeModel interface", () => {
//   it("should have name and associate properties", () => {
//     const model: SequelizeModel = {
//       name: "TestModel",
//       associate: (models) => {
//         // что тут будет
//       },
//     };

//     expect(model.name).toBe("TestModel");
//     expect(model.associate).toBeInstanceOf(Function);
//   });
// });

// describe("Db interface", () => {
//   it("should have sequelize and Sequelize properties", () => {
//     const db: Db = {
//       sequelize: new Sequelize("test", "test", "test", {
//         dialect: "postgres",
//       }),
//       Sequelize: Sequelize,
//     };

//     expect(db.sequelize).toBeInstanceOf(Sequelize);
//     expect(db.Sequelize).toBe(Sequelize);
//   });
// });

// describe("readdirSync and require models", () => {
//   it("should read models from directory and require them", () => {
//     const modelsDir = path.join(__dirname, "../models");
//     const files = readdirSync(modelsDir);

//     files.forEach((file) => {
//       const filePath = path.join(modelsDir, file);
//       const model = require(filePath).default(Sequelize, DataTypes);

//       expect(model).toBeInstanceOf(Sequelize);
//     });
//   });
// });