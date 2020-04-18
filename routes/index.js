const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

// //post dashboard
// router.post('/dashboard', ensureAuthenticated, (req, res) => {
//   // console.log(req)
//   user.gameScore = req.gameScore;
//   res.render('dashboard', {
//     user: user
//   })
// });

router.use('/game/home.html', ensureAuthenticated, (req, res, next) => {
  return next();
});



module.exports = router;
