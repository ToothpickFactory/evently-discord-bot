const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('config');
const rp = require('request-promise');

const EventsModule = require('./modules/events');
const ChannelModule = require('./modules/channel');

function init(){
	client.on('ready', () => {
    console.log('I am ready!');
	});

	client.on('message', message => {
			if(message.channel.name !== "evently-channel") return;
			let command = message.content.split(" ")[0];
			
			switch (command){
					case '!help':
							EventsModule.help(message);
							break;
					case '!get':
							EventsModule.getEvent(message);
							break;
					case '!create':
							EventsModule.createEvent(message);
							break;
					case '!remove':
							EventsModule.removeEvent(message);
							break;
					case '!join':
							EventsModule.joinEvent(message);
							break;
					case '!leave':
							EventsModule.leaveEvent(message);
							break;
					case '!sweep':
							ChannelModule.sweep(message);
							break;
			}
			if(message.author.id !== config.discord.botId) message.delete();
	});

	client.login(config.discord.token);
}

module.exports = { init, client, test: "hi world" }