const express = require('express');
const app = express();
const path = require('path');


app.get('/resume', (req, res) => {
        const filePath = path.join(__dirname, 'public','Rodrigo_Cornidez.pdf');

  res.sendFile(filePath, (err) => {
                if (err) {
                        console.error(err)
                        res.status(500).send("Internal Server Error");
                }
        });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
