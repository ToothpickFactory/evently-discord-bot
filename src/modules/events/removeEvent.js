const config = require('config');
const evently = require('eventlyjs').init(config.evently);
const getEvent = require('./getEvent');

module.exports = function(message){
    let messageParts = message.content.split(" ");
    let eventId = messageParts[1];

    getEvent(eventId)
      .then(event => {
          if(event.owner.id === message.author.id){
              removeEvent(event, message)
          } else {
              message.author.send(`Only the owner, ${event.owner.name}, may remove event ${eventId}`);
          }
        })
        .catch(err => message.author.send(err.message))
}

function removeEvent(event, message){
    return evently.events.remove(event._id)
        .then(() => {
            let channelId = event.tags.find(tag => tag.includes("channel-id")).replace("channel-id:", "");
            let messageId = event.tags.find(tag => tag.includes("message-id")).replace("message-id:", "");
            let channel = message.client.channels.find("id", channelId);
            
            channel.fetchMessage(messageId)
                .then(message => message.delete())
                .catch(console.error);
        })
        .catch(err => console.log(err.message))
}