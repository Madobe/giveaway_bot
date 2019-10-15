'use strict';

module.exports = (sequelize, DataTypes) => {
  var RemoveRoleTimer = sequelize.define('RemoveRoleTimer', {
    datetime: { type: DataTypes.DATE, allowNull: false },
    guildId: { type: DataTypes.STRING, allowNull: false, field: 'guild_id' },
    memberId: { type: DataTypes.STRING, allowNull: false, field: 'member_id' },
    roleId: { type: DataTypes.STRING, allowNull: false, field: 'role_id' }
  });

  return RemoveRoleTimer;
};