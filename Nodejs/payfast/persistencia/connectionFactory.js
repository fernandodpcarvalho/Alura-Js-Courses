var mysql  = require('mysql');

function createDBConnection(){
		return mysql.createConnection({
			host: 'localhost',
			user: 'fernando',
			password: 'fernando',
			database: 'payfast'
		});
}

module.exports = function() {
	return createDBConnection;
}
