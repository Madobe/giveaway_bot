const Model = require('./model.js');

class Donation extends Model {
  constructor(attributes) {
    super({
      ign: 'string',
      platform: 'string',
      items: 'array',
      anonymous: 'boolean',
      restrictions: 'array',
      notes: 'string'
    }, {
      items: (x) => { return x.join(', '); },
      platform: (x) => { return x.toUpperCase(); },
      anonymous: (x) => { return x ? "Yes" : "No"; },
      restrictions: (x) => { return x.join(', '); }
    });

    this.ign = attributes.ign || "";
    this.platform = attributes.platform || "";
    this.items = attributes.items || [];
    this.anonymous = attributes.anonymous || false;
    this.restrictions = attributes.restrictions || [];
    this.notes = attributes.notes || "";
  }
}

module.exports = Donation;