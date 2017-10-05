const config = require('config');
const evently = require('eventlyjs').init(config.evently);
const formatEvent = require('./formatEvent');
const webhook = `${config.server.domain}:${config.server.port}${config.server.webhook}`;

module.exports = function(message){
    let event = buildEvent(message);
    doEventCreate(event)
        .then(eventRes => event = eventRes)
        .then(() => message.channel.send(formatEvent(event)))
        .then(message => setEventMessageId(event, message))
        .catch(err => message.author.send(err.message))
}

function doEventCreate(event){
    return evently.events.create(event);
}

function setEventMessageId(event, message){
    event.tags.push('message-id:' + message.id);
    evently.events.update(event._id, event);
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
        tags: ['channel-id:' + message.channel.id],
        webhook: webhook,
        owner: {
            id: message.author.id,
            name: message.author.username
        }
    }
}