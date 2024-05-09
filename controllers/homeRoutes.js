const router = require('express').Router();
const { Game, Review, User } = require("../models");
require("dotenv").config();

// homepage
router.get("/", async(req, res) => {
    const url = "https://opencritic-api.p.rapidapi.com/game";
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": process.env.RAPID_API_KEY,
            "X-RapidAPI-Host": "opencritic-api.p.rapidapi.com",
        },
    };

    const response = await fetch(url, options);
    const games = await response.json();
    console.log(games);
    res.render("homepage", { games: games, logged_in: req.session.logged_in });  
});


// profile page

router.get('/profile', async (req, res) => {
  if (!req.session.logged_in) {
      res.redirect('/login');
      return;
  }

  try {
      const userData = await User.findByPk(req.session.user_id, {
          include: [{
              model: Review,
              include: [{
                  model: Game
              }]
          }]
      });

      if (!userData) {
          res.status(404).send("User not found");
          return;
      }

      const user = userData.get({ plain: true });

      const reviews = user.Reviews ? user.Reviews.map(review => ({
          ...review,
          game: review.Game, 
      })) : [];

      console.log(reviews); 

      res.render('profile', {
          logged_in: req.session.logged_in,
          user: user,
          reviews: reviews
      });
  } catch (err) {
      console.error("Error fetching profile data: ", err);
      res.status(500).send("Internal Server Error: " + err.message);
  }
});


// login
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });

// signup
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('signup');
  });

// social

router.get('/social', async (req, res) => {
  if (!req.session.logged_in) {
      res.redirect('/login');
      return;
  }

  try {
      const userWithFriends = await User.findByPk(req.session.user_id, {
          include: [
              {
                  model: User,
                  as: 'Friends'
              }
          ]
      });

      const friends = userWithFriends.Friends.map(friend => ({
          name: friend.name 
      }));

      res.render('social', {
          logged_in: req.session.logged_in,
          friends: friends
      });
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});



// game page


module.exports = router;