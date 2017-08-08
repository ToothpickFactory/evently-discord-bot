
module.exports = function(message){
    message.author.send(
`\`\`\`yaml
!create - Create an event
    !create -title Going -startTime 3hr -slots 6
!get - Get an event
    !get ByhH8eyrW
!remove - Removes an event
    !remove ByhH8eyrW
!join - Join an event
    !join ByhH8eyrW
!leave - Leave an event
    !leave ByhH8eyrW
\`\`\``
);
}