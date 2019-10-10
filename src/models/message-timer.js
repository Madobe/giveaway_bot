'use strict';

module.exports = (sequelize, DataTypes) => {
  var MessageTimer = sequelize.define('MessageTimer', {
    datetime: { type: DataTypes.DATE, allowNull: false },
    userId: { type: DataTypes.STRING, allowNull: false, field: 'user_id' },
    text: { type: DataTypes.STRING, allowNull: false }
  });

  return MessageTimer;
};