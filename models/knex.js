var knex = require('knex');
var db = knex({
	client: "mysql",
	connection: {
		database: 'atlantic',
		host : '45.55.40.232',
		port : 3306,
		user : 'root',
		password : '*T3mp3st!',
		supportBigNumbers: true
	}
});

module.exports = db;
