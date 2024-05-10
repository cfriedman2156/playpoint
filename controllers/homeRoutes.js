const router = require('express').Router();
const { Game, Review, User } = require("../models");
require("dotenv").config();

// homepage
router.get("/", async(req, res) => {
    const url = "https://opencritic-api.p.rapidapi.com/game/popular";
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": process.env.RAPID_API_KEY,
            "X-RapidAPI-Host": "opencritic-api.p.rapidapi.com",
        },
    };

    const response = await fetch(url, options);
    const games = await response.json();
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
      console.log("User Data Fetched: ", JSON.stringify(userData, null, 2));
      if (!userData) {
          res.status(404).send("User not found");
          return;
      }

      const user = userData.get({ plain: true });
      console.log("Plain User Data: ", JSON.stringify(user, null, 2));
      const reviews = user.reviews ? user.reviews.map(review => {
        console.log("Review being processed:", JSON.stringify(review, null, 2)); // This will log each review
        return {
            gameName: review.game ? review.game.name : "No game associated",
            description: review.description,
            stars: review.stars || 'No rating' // Handling cases where stars might be null
        };
    }) : [];
    console.log("Reviews Data to Render: ", JSON.stringify(reviews, null, 2)); // This logs the reviews data array

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
router.get('/game/:id', async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
    }

    try {
        const gameId = req.params.id;

            const url = `https://opencritic-api.p.rapidapi.com/game/${gameId}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                    'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
                }
            };

            const response = await fetch(url, options);
            if (!response.ok) throw new Error('Failed to fetch from OpenCritic API');

            const results = await response.json();
            
            const game = { 
                name: results.name,
                description: results.description,
                image: results.images.box.og,
                rapid_id: gameId
            }

            const gameData = await Game.findOne({
                where: { rapid_id: gameId }, 
                include: [{
                    model: Review,
                    include: [{ model: User, attributes: ['name'] }]
                }]
            });

            let reviews = [];
            let userGame;

            if (gameData) {
                const userGame = gameData.get({ plain: true });
                reviews = userGame.reviews ? userGame.reviews.map(review => ({
                    description: review.description,
                    user: { name: review.user.name }
                })) : [];
            }

            res.render('game', {
                logged_in: req.session.logged_in,
                game: game,
                reviews: reviews
            });

    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("Internal Server Error: " + err.message);
    }
});



module.exports = router;