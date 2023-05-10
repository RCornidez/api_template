//import libraries
const { Pool } = require('pg');

//Define and export DB Connection parameters 
module.exports = {
	pool: new Pool ({
	  user: 'api', 
	  host: 'localhost',
	  password: 'password',
	  database: 'results',
	  port: 5432,
		}),
}
