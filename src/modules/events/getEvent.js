const rp = require('request-promise');
const config = require('config');
const formatEvent = require('./formatEvent');

module.exports = function(eventId){
    let options = {
        uri: `${config.evently.url}/events/${eventId}`,
        json: true
    }
    return rp(options);
}