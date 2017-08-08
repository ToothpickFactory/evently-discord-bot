const rp = require('request-promise');
const config = require('config');
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
    let options = {
        method: 'DELETE',
        uri: `${config.evently.url}/events/${event._id}`,
        json: true
    }
    return rp(options)
        .then(() => {
            let channel = message.client.channels.find("id", event.secondId);
            channel.fetchMessage(event.thirdId)
                .then(message => message.delete())
                .catch(console.error);
        })
        .catch(err => console.log(err.message))
}