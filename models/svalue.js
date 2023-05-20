'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class svalue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  svalue.init({
    sensorid: DataTypes.TEXT,
    valueid: DataTypes.INTEGER,
    value: DataTypes.INTEGER,
    beforehash: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'svalue',
  });
  return svalue;
};