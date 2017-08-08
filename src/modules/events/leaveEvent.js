const rp = require('request-promise');
const config = require('config');
const refreshEvent = require('./refreshEvent');

module.exports = function(message){
    let messageParts = message.content.split(" ");
    let eventId = messageParts[1];
    let userId = message.author.id; 

    let options = {
        method: 'DELETE',
        uri: `${config.evently.url}/events/${eventId}/participants/${userId}`,
        json: true
    }
    return rp(options)
        .then(event => {
            let user = message.client.users.find("id", event.owner.id);
            user.send(`${message.author.username} has left event ${eventId}!`);
            refreshEvent(event, message);
        })
        .catch(err => message.author.send(err.message))
}