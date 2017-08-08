module.exports = function(event){
    let participantsDisplay = event.participants.map(part => part.name);

    let msg =
`\`\`\`yaml
ID: ${event._id}
TITLE: ${event.title}
STARTS-IN: ${timeToDHRMIN(event.startTime)}
START-TIME: ${new Date(event.startTime).toUTCString()}
SLOTS: ${event.slots}
OWNER: ${event.owner.name}
PARTICIPANTS: ${participantsDisplay.toString()}
\`\`\``;
    return msg;
}


function timeToDHRMIN(startTime){
    let timeTill = startTime - Date.now();
    let days = Math.floor(timeTill / 86400000);
    let hours = Math.floor(timeTill % (3600000 * 24) / 3600000);
    let minutes = Math.floor(timeTill % (3600000) / 60000);
    return `${days}d ${hours}hrs ${minutes}min`;
}