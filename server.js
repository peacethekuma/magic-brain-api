const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const formData = require('express-form-data');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  }
});


const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(formData.parse());

app.get('/', (req, res) => { res.send('it is working!') });

//sign in
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

//register
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

//profile
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });

//image
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });
app.post('/image-upload', (req, res) => { image.uploadImage(req, res) });


app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
})