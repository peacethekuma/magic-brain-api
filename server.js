const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
<<<<<<< HEAD

const app = express();
app.use(bodyParser.json());
app.use(cors());


=======
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: '',
    password: '',
    database: 'magic-brain'
  }
});


const app = express();
>>>>>>> development

// middleware
app.use(cors());
app.use(bodyParser.json());


//sign in
<<<<<<< HEAD
app.post('/signin', (req, res) => {
  console.log(req.body);
  
  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    return res.json(database.users[0]);
  } else {
    res.status(400).json('error logging in')
  }
})

//register
app.post('/register', (req, res) => {

  const {
    email,
    password,
    name
  } = req.body;

  bcrypt.hash(password, null, null, function (err, hash) {
    // Store hash in your password DB.
    console.log(hash);
  });

  database.users.push({
    id: '125',
    name: name,
    email: email,
    // password: password,
    entries: 0,
    joined: new Date()
  });

  res.json(database.users[database.users.length - 1]);
})
=======
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

//register
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
>>>>>>> development

//profile
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });

//image
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(3000, () => {
  console.log('app is running on port 3000');
})