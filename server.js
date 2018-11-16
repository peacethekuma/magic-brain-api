const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());



const database = {
  users: [{
    id: '123',
    name: 'John',
    email: 'john@gmail.com',
    password: 'cookies',
    entries: 0,
    joined: new Date()
  }, {
    id: '234',
    name: 'Sally',
    email: 'sally@gmail.com',
    password: 'burger',
    entries: 0,
    joined: new Date()
  }, {
    id: '677',
    name: 'kevin',
    email: 'kdevin@gmail.com',
    password: 'bananas',
    entries: 0,
    joined: new Date()
  }]
}

app.get('/', (req, res) => {
  res.send(database.users)
})

//sign in 
app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    return res.json('success');
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
  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length - 1]);
})

//profile
app.get('/profile/:id', (req, res) => {
  const {
    id
  } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  })
  if (!found) {
    res.status(400).json('not found');
  }
})

// image
app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries += 1;
      return res.json(user.entries);
    }
  })
  if (!found) {
    res.status(400).json('not found');
  }
})


app.listen(3000, () => {
  console.log('app is running on port 3000');

})


/*
/--> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT -->user


*/