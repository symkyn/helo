const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const cors = require("cors");
const session = require('express-session');


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

app.use( session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}) );

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
        .then(newUser => {
            req.session.userid = newUser.id;
            res.status(201).send(newUser)})
        .catch(err => {
            console.warn(err); 
            next({message: 'internal server error' })
        })
})

app.post('/api/login', (req, res, next) => {
    const loginUN = req.body.username;
    req.db.user(loginUN)
        .then(result => {
            req.session.userid = result[0].id;
            res.status(200).send(result[0])})
        .catch(err => {
            console.warn(err); 
            next({message: 'internal server error' })
        })
})

app.get('/api/auth/me', (req, res, next) => {
    const sessionUser = req.session.userid;
    req.db.sessionUserInfo(sessionUser)
        .then(result => res.status(200).send(result[0]))
        .catch(err => {
            console.warn(err); 
            next({message: 'internal server error' })
        })
})


app.get('/api/posts/', (req, res, next) => {
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
        req.db.noUser(req.session.userid)
            .then(result => res.status(200).send(result))
            .catch(err => {
                console.warn(err); 
                next({message: 'internal server error' })
            })
    } else {
        req.db.searchTermNoUser(`%${req.query.search}%`, req.session.userid)
            .then(result => res.status(200).send(result))
            .catch(err => {
                console.warn(err); 
                next({message: 'internal server error' })
            })
    }
    
})

app.get('/api/post/:id', (req, res, next) => {
    req.db.post(req.params.id)
        .then(result => res.status(200).send(result[0]))
        .catch(err => {
            console.warn(err); 
            next({message: 'internal server error' })
        })
})

app.post('/api/post/', (req, res, next) => {
    const id = req.session.userid;
    const newPost = {...req.body, author_id: id};
    req.db.Posts.insert(newPost)
        .then(result => 
            res.status(200).send(result))    
        .catch(err => {
            console.warn(err); 
            next({message: 'internal server error' })
        })
}) 

app.post('/api/auth/logout', (req, res, next) => {
    console.log('logout');
    req.session.destroy();
    console.log(req.session.userid);
        
})

app.use((err, req, res, next) => {
    res.status(500).send(err);
})


const port = process.env.PORT || 4000;
app.listen( port, () => console.log(`Server listening on port ${port}`));