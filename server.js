const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
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

// middleware
app.use(cors());
app.use(bodyParser.json());


//sign in
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

//register
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

//profile
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });

//image
app.put('/image', (req, res) => { image.handleImage(req, res, db) });


app.listen(3000, () => {
  console.log('app is running on port 3000');
})