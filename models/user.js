'use strict';
import { Model } from 'sequelize'; 
export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};