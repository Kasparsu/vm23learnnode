'use strict';
import { DateTime } from 'luxon';
import { Model } from 'sequelize'; 
export default (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movie.init({
    name: DataTypes.TEXT,
    length: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    snippet: {
      type: DataTypes.VIRTUAL,
      get(){
        return this.description.split('\n')[0];
      },
      set(value){
        throw new Error('Dont try to set virtual values');
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      get(){
        const rawValue = this.getDataValue('createdAt');
        return DateTime.fromJSDate(rawValue).setLocale("en");
      }
    }
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};