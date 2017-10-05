const config = require('config');
const evently = require('eventlyjs').init(config.evently);
const refreshEvent = require('./refreshEvent');

module.exports = function(message){
    let messageParts = message.content.split(" ");
    let eventId = messageParts[1];

    let participant = {
        id: message.author.id,
        name: message.author.username
    }

    return evently.events.join(eventId, participant)
        .then(event => {
            let user = message.client.users.find("id", event.owner.id);
            user.send(`${participant.name} has joined event ${eventId}!`);
            refreshEvent(event, message);
        })
        .catch(err => message.author.send(err.message))
}