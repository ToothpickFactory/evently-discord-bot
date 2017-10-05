const config = require('config');
const evently = require('eventlyjs').init(config.evently);
const refreshEvent = require('./refreshEvent');

module.exports = function(message){
    let messageParts = message.content.split(" ");
    let eventId = messageParts[1];
    let userId = message.author.id; 

    return evently.events.leave(eventId, userId)
        .then(event => {
            let user = message.client.users.find("id", event.owner.id);
            user.send(`${message.author.username} has left event ${eventId}!`);
            refreshEvent(event, message);
        })
        .catch(err => message.author.send(err.message))
}