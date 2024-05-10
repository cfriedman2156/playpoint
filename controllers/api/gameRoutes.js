const router = require('express').Router();
const { Game, Review, User } = require('../../models');
const withAuth = require("../../utils/auth");

router.get('/', async (req, res) => {
    try {
        const games = await Game.findAll();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET a single game by ID
router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findByPk(req.params.id);
        if (!game) {
            res.status(404).json({ message: 'No game found with this id!' });
            return;
        }
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;


//POST  
router.post('/', async (req, res) => {
    try {
        const {name, gameDescription, cover, rapid_id, reviewDescription, stars} = req.body;
        const newGame = await Game.create({name, description: gameDescription, cover, rapid_id})
        const newReview = await Review.create({description: reviewDescription, stars, user_id: req.session.user_id, game_id:newGame.id})
        console.log(newReview)
        if (!newGame && !newReview){
            res.status(400).json("error in creating game review");
        }
        res.status(200).json("successfully created game review!");
    } catch (error) {
        res.status(500).json(error);
    }
});


// POST route to add a review
router.post('/reviews', async (req, res) => {
    console.log(req);
    console.log(res);
    try {
        const newReview = await Review.create({
            description: req.body.description,
            game_id: req.body.game_id,
            user_id: req.session.user_id, 
            created_time: new Date(), 
            updated_time: new Date()
        });
        res.json(newReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create review' });
    }
});

// GET game ID by rapid_id
router.get('/find-by-rapid-id/:rapidId', async (req, res) => {
    try {
        const game = await Game.findOne({ where: { rapid_id: req.params.rapidId } });
        if (!game) {
            res.status(404).json({ message: 'No game found with this rapid ID!' });
            return;
        }
        res.status(200).json({ id: game.id });
    } catch (error) {
        res.status(500).json(error);
    }
});

