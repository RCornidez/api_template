//import libraries
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg')

//define connection to database using configs set in database.js
const { pool } = require('./database');

//initialize express instance and add JSON middlware to handle requests
const app = express();
app.use(express.json())

//allows requests to come from specific domains
const allowedOrigins = ['https://www.cornidez.com', 'https://cornidez.com'];
app.use(cors({origin: allowedOrigins}));

// use this for troubleshooting if your domains are causing issues. This allows requests to come from anywhere.
//app.use(cors({origin: '*'}));

//ROUTES
//returns a count of votes sorted by color
app.get('/results', (req, res) => {
        pool
                .connect()
                .then(client => {
                        return client
                                .query(`SELECT color, COUNT(*) as count FROM results GROUP BY color`)
                                .then(data => {
                                client.release()
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
                res.status(200)
      })
    .catch(error => {
            //client.release()
            console.log(error)
      })
    })
});

//Start the express server and listen for requests on port 3000
app.listen(3000, () => {
  console.log('API available on port 3000');
});
                                                                             
