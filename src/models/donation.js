'use strict';

module.exports = (sequelize, DataTypes) => {
  var Donation = sequelize.define('Donation', {
    ign: { type: DataTypes.STRING, allowNull: false },
    platform: { type: DataTypes.STRING, allowNull: false },
    items: { type: DataTypes.STRING, allowNull: false },
    anonymous: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    availability: { type: DataTypes.STRING, allowNull: false, defaultValue: 'N/A' },
    restrictions: { type: DataTypes.STRING, allowNull: false, defaultValue: 'none' },
    notes: { type: DataTypes.STRING, allowNull: false, defaultValue: 'N/A' },
    discord_tag: { type: DataTypes.STRING, allowNull: false },
    discord_id: { type: DataTypes.STRING, allowNull: false }
  });

  return Donation;
};