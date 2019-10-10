'use strict';

module.exports = (sequelize, DataTypes) => {
  var CleanChannelTimer = sequelize.define('CleanChannelTimer', {
    datetime: { type: DataTypes.DATE, allowNull: false },
    channelId: { type: DataTypes.STRING, allowNull: false, field: 'channel_id' },
    ignoreIds: { type: DataTypes.STRING, defaultValue: "", field: 'ignore_ids' }
  });

  return CleanChannelTimer;
};