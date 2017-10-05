const formatEvent = require("./formatEvent");

module.exports = function(event, message){
    let channelId = event.tags.find(tag => tag.includes("channel-id")).replace("channel-id:", "");
    let messageId = event.tags.find(tag => tag.includes("message-id")).replace("message-id:", "");
    let formattedEvent = formatEvent(event);
    let channel = message.client.channels.find("id", channelId);

    channel.fetchMessage(messageId)
        .then(message => message.edit(formattedEvent))
        .catch(console.error);
}