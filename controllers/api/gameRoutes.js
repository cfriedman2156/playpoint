const router = require('express').Router();
const { Game } = require('../../models');

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
