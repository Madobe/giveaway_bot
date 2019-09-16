class Responses {
  constructor(hash) {
    this.ign = hash.ign || null;
    this.platform = hash.platform || null;
    this.items = hash.items || null;
    this.anonymous = hash.anonymous || false;
    this.availability = hash.availability || null;
    this.restrictions = hash.restrictions || "N/A";
    this.notes = hash.notes || "N/A";
  }

  toEmbed(message, options) {
    const embed = new RichEmbed()
      .setColor(options.color || "#0486f7")
      .setTitle(options.title || "Donation Responses")
      .addField("IGN", `${this.ign} ${(this.anonymous ? "(anonymous)" : "")}`)
      .addField("Platform", this.platform)
      .addField("Items", this.items)
      .addField("Anonymous?", `${(this.anonymous ? "Yes" : "No")}`)
      .addField("Availability", this.availability)
      .addField("Restrictions", this.restrictions)
      .addField("Notes", this.notes)
      .addField("Submitter", `${this.tag} (ID:${this.userId})`);
  }

  validate() {
    return this.ign !== null
      && this.platform !== null
      && this.items !== null
      && (this.anonymous || !this.anonymous)
      && this.availability !== null
      && (typeof(this.restrictions) === 'string' || this.restrictions instanceof Array)
      && typeof(this.restrictions) === 'string';
  }
}

module.exports = Responses;