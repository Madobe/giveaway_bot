const Client = {
  timers: []
}

const Channel = (args) => {
  return {
    id: args.id,
    send: message => message
  }
}

const Message = (args) => {
  return {
    id: args.id,
    content: args.text,
    channel: Channel({ id: args.channelId || args.id }),
    member: Member({
      id: args.memberId || args.id,
      roleId: args.roleId || args.id
    })
  }
}

const Member = (args) => {
  return {
    id: args.id,
    roles: {
      cache: Collection({
        id: args.roleId,
        data: [{ roleId: args.roleId }]
      })
    }
  }
}

const Collection = (args) => {
  return {
    data: args.data,
    get: function(id) {
      return args.id !== '1' ? this.data[0] : undefined
    }
  }
}

module.exports = {
  Client,
  Channel,
  Message
}