const config = require('config');
const evently = require('eventlyjs').init(config.evently);

module.exports = function(eventId){
    return evently.events.get(eventId);
}