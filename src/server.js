const config					= require("config");
const express					= require("express");
const app         		= express();
const bodyParser			= require('body-parser');
const cors        		= require('cors');
const getDirectories	= require('./util/directoryFinder');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Require all routes from the routes directory
getDirectories(__dirname + '/api/').forEach(dir => require(`${__dirname}/api/${dir}`)(app));



module.exports = function(){
	app.listen(config.server.port, () => { console.log(`Sample App listing on port: ${config.server.port}`) });
}