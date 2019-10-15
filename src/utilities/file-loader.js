/*
 * This function loads in all function exports in all JS files in the given path.
 */
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const path = require("path");
const { flow, split, head } = require('lodash/fp');

module.exports = async (address) => {
  return (await readdir(address)).filter(file => file.endsWith('.js')).reduce((acc, file) => {
    const name = flow([split, head])('.', file)
    const props = require(path.resolve(address, file))

    return Object.assign(acc, { [name]: props })
  }, {})
}