const express = require('express');
const router = express.Router();
const User = require('../models/User.js')
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
function queryTopTenScorers(render, req, res){
  User.find().sort({score : -1 }).limit(10)
  .exec((err, scorers) => {
    if(err) 
      console.log(err);
    render(req,res, scorers);  
  });
}
function render(req, res, scorers){
  res.render('dashboard', {
    user: req.user,
    scorers: scorers
  })
}
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  queryTopTenScorers(render, req, res);
  
});

//post dashboard
router.post('/dashboard', ensureAuthenticated, (req, res, next) => {
  const score = req.body['game-score'];
  if(score > req.user.score){
    User.findById(req.user.id, (err, user) => {
      user.score = score;
      req.user.score = user.score;
      user.save((err) => {
        queryTopTenScorers(render, req, res);
      });
    });
  }
  else{
    queryTopTenScorers(render, req, res);
  }
});

router.use('/game/home.html', ensureAuthenticated, (req, res, next) => {
  
  return next();
});



module.exports = router;
