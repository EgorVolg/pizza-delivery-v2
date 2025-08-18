import { Model, ModelStatic } from "sequelize";

export interface CustomModel extends ModelStatic<Model<any, any>> {
  associate?: (models: Record<string, CustomModel>) => void;
}
