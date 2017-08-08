const formatEvent = require("./formatEvent");

module.exports = function(event, message){
    let formattedEvent = formatEvent(event);
    let channel = message.client.channels.find("id", event.secondId);

    channel.fetchMessage(event.thirdId)
        .then(message => message.edit(formattedEvent))
        .catch(console.error);
}