const startingSoon = require("../../modules/hooks/startingSoon");

/*
	Join
	Leave
	Starting Soon
	On Create
	On Update
*/

// Routes
module.exports = (app) => {

	app.post('/webhook', (req, res) => {
		let action = req.body.action;
		let event = req.body.event;

		console.log(action);

		switch(action){
			case "STARTING_SOON":
				startingSoon(event);
				break;
		}

		res.send("You called the starting endpoint!");
	});
};
