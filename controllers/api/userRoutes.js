const router = require('express').Router();
const { User, Review, Game, Friendship } = require('../../models');

//sign up
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    console.log(req.body)
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Missing email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// POST endpoint to find user by name
router.post('/find-by-name', async (req, res) => {
  const { name } = req.body;
  try {
      const user = await User.findOne({
          where: { name: name }
      });
      if (user) {
          res.json({ id: user.id, name: user.name });  
      } else {
          res.status(404).send('User not found');
      }
  } catch (error) {
      console.error('Error finding user:', error);
      res.status(500).send('Internal Server Error');
  }
});

// POST endpoint to add a friend
router.post('/add-friend', async (req, res) => {
  const { friendId } = req.body;
  const userId = req.session.user_id;

  if (!userId) {
      return res.status(403).send('Not logged in');
  }

  try {
      const existingFriendship = await Friendship.findOne({
          where: {
              user_id: userId,
              friend_id: friendId
          }
      });

      if (existingFriendship) {
          return res.status(409).send('This user is already your friend.');
      }

      await Friendship.create({
          user_id: userId,
          friend_id: friendId
      });
      res.send('Friend added successfully');
  } catch (error) {
      console.error('Error adding friend:', error);
      res.status(500).send('Internal Server Error');
  }
});

// Route to get friends' reviews
router.get('/social', async (req, res) => {
  if (!req.session.logged_in) {
      res.redirect('/login');
      return;
  }

  try {
      const friendships = await Friendship.findAll({
          where: { user_id: req.session.user_id }
      });

      const friendIds = friendships.map(friendship => friendship.friend_id);

      const friendsReviews = await Review.findAll({
          include: [
              {
                  model: User,
                  attributes: ['name'],
                  where: { id: friendIds }  
              },
              {
                  model: Game,
                  attributes: ['name']
              }
          ]
      });

      const reviewsData = friendsReviews.map(review => ({
          friendName: review.User.name,
          gameName: review.Game.name,
          description: review.description,
          rating: review.stars
      }));

      res.render('social', {
          friendsReviews: reviewsData.length > 0 ? reviewsData : null
      });
  } catch (error) {
      console.error('Error fetching friends and reviews:', error);
      res.status(500).send('Internal Server Error');
  }
});

router.get('/search/:searchItem', async (req, res) => {
  const fetch = require('node-fetch');

  const url = `https://opencritic-api.p.rapidapi.com/game/search?criteria=${req.params.searchItem}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    res.json(JSON.parse(result));
    console.log(result);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
