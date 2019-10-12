const chai = require("chai")
chai.use(require("chai-string"))
const expect = chai.expect
const { RichEmbed } = require('discord.js')
const command = require('../../src/commands/help')
const { Message } = require('../shared/mock_discord')

describe('help', function() {
  it('returns an embed', async function() {
    const res = await command.run({}, Message({
      id: 1,
      text: '',
      roleId: '506311827341443072'
    }), [])

    expect(res.embed instanceof RichEmbed).to.eq(true)
  })

  it('returns nothing if the member is lacking permissions', async function() {
    const res = await command.run({}, Message({
      id: 1,
      text: '',
      roleId: '1'
    }), [])

    expect(res).to.eq(undefined)
  })
})