/*
 * Populates the database with data. If it existed.
 */
const models = require('../src/models');

models.sequelize.sync();