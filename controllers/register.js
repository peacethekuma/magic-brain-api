const handleRegister = (req, res,db,bcrypt) => {
  const { email, password, name } = req.body;
  const hash = bcrypt.hashSync(password);

  //First update login table
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          }).then(user => {
            res.json(user[0]);
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
    //insert new user to data base
    .catch(err => res.status(400).json('Unable to register'))

}

module.exports = {
  handleRegister:handleRegister
}