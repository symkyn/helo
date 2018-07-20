const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const cors = require("cors");



require('dotenv').config({
    path: __dirname + '../../.env',
});

const app = express();

let db;

massive(process.env.DB_CONNECTION_STRING)
    .then(dbInstance => {
        console.log('DB Connected');
        db = dbInstance;
    })
    .catch(err => console.warn(err))

app.use(cors());
app.use( bodyParser.json() );
app.use(express.static(__dirname + '/../build'));

app.use((req, res, next) => {
    if (!db) {
        console.warn('Database not connected');
        return next({message: 'Internal Server Error'})
    }
    req.db = db;
   next();
});

app.use((err, req, res, next) => {
    res.status(500).send(err);
})


const port = process.env.PORT || 4000;
app.listen( port, () => console.log(`Server listening on port ${port}`));