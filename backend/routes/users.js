const router = require("express").Router();
let User = require("../models/user-model");

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:email").get((req, res) => {
  const email = req.params.email;

  User.findOne({email: email}, (err, foundUser) => {
    if(err) {
      res.status(400).json("Error: " + err);
    } else {
      res.json(foundUser);
    }
  });
})

router.route("/add").post((req, res) => {
  const {firstname, lastname, email, password, account} = req.body;

  const newUser = new User({
    firstname,
    lastname,
    email,
    password,
    fundingHistory: [],
    account
  });

  newUser.save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/check").post((req, res) => {
  const {email, password} = req.body;

  User.findOne({email: email}, function(err, foundUser){
    if(err){
      res.status(400).json("Error: " + err);
    } else {
        if(foundUser){
            if(foundUser.password === password){
              res.json("User verified!");
            } else {
              res.json("Incorrect password!");
            }
        }
    }
  });
});

router.route("/update/:email").patch((req, res) => {
  const email = req.params.email;
  const newItem = req.body.fund;
  let list;

  User.findOne({email: email}, (err, user) => {
    if(err) {
      res.status(400).json("Error: " + err);
    } else {
      if(user.fundingHistory.length === 0){
        list = [newItem];
      } else {
        list = [...user.fundraisingHistory, newItem];
      }
      
      User.updateOne({ email: email }, { fundingHistory: list }, (err, docs) => {
        if(err) {
          res.status(400).json("Error: " + err);
        } else {
          res.json("Funding History updated!");
        }
      })
    }
  });
});

module.exports = router;