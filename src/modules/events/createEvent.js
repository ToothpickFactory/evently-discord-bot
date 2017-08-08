const rp = require('request-promise');
const config = require('config');
const formatEvent = require('./formatEvent');
const webhook = `${config.server.domain}:${config.server.port}${config.server.webhook}`;

module.exports = function(message){
    let event = buildEvent(message);
    doEventCreate(event)
        .then(eventRes => event = eventRes)
        .then(() => message.channel.send(formatEvent(event)))
        .then(message => setEventMessageId(event, message.id))
        .catch(err => message.author.send(err.message))
}

function doEventCreate(event){
    let options = {
        method: 'POST',
        uri: `${config.evently.url}/events`,
        body: event,
        json: true
    }
    return rp(options);
}

function setEventMessageId(event, messageId){
    event.thirdId = messageId;

    let options = {
        method: 'PUT',
        uri: `${config.evently.url}/events/${event._id}`,
        body: event,
        json: true
    }
    return rp(options);
}

function buildEvent(message){
    let messageParts = message.content.split(/-([^-]+)/);
    let event = {}
    for(let i = 1; i < messageParts.length; i++){
        let parts = messageParts[i].split(" ");
        let key = parts[0];
        let values = parts.slice(1, parts.length);
        event[key] = values;
    }
    return cleanEvent(event, message);
}

function convertTime(timeArr){
    let days = toTimeNumbers(timeArr, "d", 86400000);
    let hrs = toTimeNumbers(timeArr, "hr", 3600000);
    let mins = toTimeNumbers(timeArr, "min", 60000);
    return Date.now() + days + hrs + mins;
}

function toTimeNumbers(timeArr, timeDenote, timeMultiplier){
    let foundTime = timeArr.find(t => t.indexOf(timeDenote) > -1);
    return foundTime ? Number(foundTime.replace(timeDenote, "")) * timeMultiplier : 0;
}

function cleanEvent(event, message){
    return {
        title: event.title ? event.title.join(" ") : "",
        startTime: event.startTime ? convertTime(event.startTime) : null,
        slots: event.slots ? Number(event.slots) : 0,
        participants: event.participants || [],
        clientId: config.evently.apiKey,
        secondId: message.channel.id,
        webhook: webhook,
        owner: {
            id: message.author.id,
            name: message.author.username
        }
    }
}