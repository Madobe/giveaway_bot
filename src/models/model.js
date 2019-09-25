/*
 * The base model that handles all type checking and actual database interaction. When converted to
 * an embed, the order of attributes first provided for typechecking is the order on the embed.
 */
const { RichEmbed } = require('discord.js');

class Model {
  constructor(attributes, formats) {
    this._types = {};
    this._order = [];
    this._formats = formats;

    for (let attribute in attributes) {
      const type = attributes[attribute];
      this._types[attribute] = type;
      this._order.push(attribute);
    }

    return new Proxy(this, {
      get(target, prop) {
        if (target['_formats'] && target['_formats'][prop]) {
          const formatter = Reflect.get(target, '_formats')[prop];
          const value = Reflect.get(target, prop);

          return formatter(value);
        } else {
          return Reflect.get(target, prop);
        }
      },

      set(target, prop, val) {
        if (target['_types'] && target['_types'][prop]) {
          if (target['_types'][prop] === typeof val || (target['_types'][prop] === 'array' && Array.isArray(val))) {
            return Reflect.set(target, prop, val);
          }
        } else if (prop.startsWith('_')) {
          return true;
        } else {
          return false;
        }
      }
    })
  }

  toEmbed(title, color) {
    const embed = new RichEmbed()
      .setTitle(title)
      .setColor(color || '#0486f7')

    for (let key in this._order) {
      embed.addField(key, this.attributes[key]);
    }
  }

  async save() {}
  async load(id) {}
}

module.exports = Model;