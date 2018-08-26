const express           = require('express'),
      bodyParser        = require('body-parser'),
      app               = express(),
      massive           = require('massive'),
      pC                = require('./controllers/product_controller'),
      PORT              = 4000;
      require('dotenv').config();

app.use(bodyParser.json());

//MASSIVE CONFIG
massive(process.env.CONNECTION_STRING)
    .then(db => {
        app.set('db', db);
    }).catch(err => console.log('Error in massive', err));

//GET
app.get('/api/inventory', pC.getAll);

//POST
app.post('/api/product', pC.create);

//DELETE
app.delete('/api/product/:id', pC.delete);

//UPDTE
app.put('/api/product/:id', pC.update);

app.listen(PORT, () => console.log(`Running server on port ${PORT}`));