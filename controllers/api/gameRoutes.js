const router = require('express').Router();
const { Game, Review } = require('../../models');

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

// put post delete code below

//POST  Ask Drew/Kyle if we need to specify '/:id' for adding new game being reviewed to storage table
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
