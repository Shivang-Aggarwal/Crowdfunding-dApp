const router = require("express").Router();
let Fundraiser = require("../models/fundraiser-model");

router.route("/").get((req, res) => {
  Fundraiser.find()
    .then(fundraisers => res.json(fundraisers))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  const id = req.params.id;
  
  Fundraiser.findOne({id: id}, (err, fundraiser) => {
    if(err) {
      res.status(400).json("Error: " + err);
    } else {
      res.json(fundraiser);
    }
  });
})

router.route("/add").post((req, res) => {
  const id = req.body.id;

  const newFundraiser = new Fundraiser({ id });

  newFundraiser.save()
    .then(() => res.json("Fundraiser added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").patch((req, res) => {
  const id = req.params.id;
  const newItem = req.body.fund;
  let list;

  Fundraiser.findOne({id: id}, (err, fundraiser) => {
    if(err) {
      res.status(400).json("Error: " + err);
    } else {
      if(fundraiser.fundraisingHistory.length === 0){
        list = [newItem];
      } else {
        list = [...fundraiser.fundraisingHistory, newItem];
      }
      
      Fundraiser.updateOne({ id: id }, { fundraisingHistory: list }, (err, docs) => {
        if(err) {
          res.status(400).json("Error: " + err);
        } else {
          res.json("Fundraiser updated!");
        }
      })
    }
  });
});

module.exports = router;