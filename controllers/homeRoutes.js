const router = require('express').Router();
const { Game, Review, User } = require("../models");

router.get("/", async(req, res) => {
    res.render("homepage")
});

module.exports = router;