/*
 * This function loads in all function exports in all JS files in the given path.
 */
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const path = require("path");

module.exports = async (address) => {
  const files = await readdir(address);
  const commands = {};

  files.forEach(file => {
    if (!file.endsWith(".js")) return;

    try {
      const props = require(path.join("..", address, file));
      const name = file.split(".")[0];
      commands[name] = props;
    } catch (e) {
      console.log(`Failed to open file ${file}: ${e}`);
    }
  });

  return commands;
}