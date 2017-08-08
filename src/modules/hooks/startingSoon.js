const config = require('config');
const client = require('../../client').client;

module.exports = function(event){

	event.participants.forEach(p => {
		let user = client.users.find("id", p.id);
		user.send(`${event.title} is starting soon!`);
	});

}