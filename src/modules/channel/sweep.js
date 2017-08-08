module.exports = function(message){

	message.channel.fetchMessages({limit: 99})
		.then(messages => message.channel.bulkDelete(messages));
}