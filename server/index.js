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

app.post('/api/newUser', (req, res, next) => {
    const newUser = {...req.body, prfile_pic: `https://robohash.org/${req.body.username}`};
    req.db.Users.insert(newUser)
        .then(newUser => res.status(201).send(newUser))
        .catch(err => {
            console.warn(err); 
            next({message: 'internal server error' })
        })
})

app.post('/api/login', (req, res, next) => {
    const loginUN = req.body.username;
    req.db.user(loginUN)
        .then(result => res.status(200).send(result[0]))
        .catch(err => {
            console.warn(err); 
            next({message: 'internal server error' })
        })
})

app.get('/api/posts/:id', (req, res, next) => {
    const { id } = req.params.id;
    if(req.query.includesSelf=='true' && req.query.search == '') {
        req.db.noQuery()
            .then(result => res.status(200).send(result))
            .catch(err => {
                console.warn(err); 
                next({message: 'internal server error' })
            })
    } else if(req.query.includesSelf=='true' && req.query.search != '') {
        req.db.searchTerm(`%${req.query.search}%`)
            .then(result => res.status(200).send(result))
            .catch(err => {
                console.warn(err); 
                next({message: 'internal server error' })
            })
    } else if(req.query.includesSelf=='false' && req.query.search == '') {
        console.log('exclude self')
    } else {
        console.log('search term and exclude self')
    }
    
})

app.use((err, req, res, next) => {
    res.status(500).send(err);
})


const port = process.env.PORT || 4000;
app.listen( port, () => console.log(`Server listening on port ${port}`));