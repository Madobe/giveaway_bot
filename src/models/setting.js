'use strict';

module.exports = (sequelize, DataTypes) => {
  var Setting = sequelize.define('Setting', {
    name: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.STRING, allowNull: false }
  });

  return Setting;
};