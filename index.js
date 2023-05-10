//import libraries
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg')

//define connection to db
const { pool } = require('./database');

const app = express();
app.use(express.json())

//needed if using different domains
app.use(cors());
//app.use(cors({origin: '*'}));

//ROUTES

//returns the full list of votes
app.get('/results', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`SELECT color, COUNT(*) as count FROM results GROUP BY color;`)
				.then(data => {
			        client.release()
					res.header("Access-Control-Allow-Origin", "https://www.cornidez.com");
			        res.send(data.rows)
			})
		.catch(error => {
		        //client.release()
		        console.log(error)
			})
  	})
});

//writes a new vote to the results table
app.post('/new_vote', (req, res) => {
	pool
    .connect()
    .then(client => {
      return client
        .query(`
        insert into results
                (user_id, color)
        values
                (\'${req.body.user_id}\',\'${req.body.color}\')`
		)
		.then(data => {
              client.release()
				res.header("Access-Control-Allow-Origin", "https://www.cornidez.com");
              res.status(200)
      })
    .catch(error => {
            //client.release()
            console.log(error)
      })
    })
});





app.listen(3000, () => {
  console.log('API available on port 3000');
});

