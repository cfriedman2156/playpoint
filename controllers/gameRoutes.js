const router = require("express").Router();
const { Game, Review, User } = require("../models");
require("dotenv").config();

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const url = `https://opencritic-api.p.rapidapi.com/game/${id}`;
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
  res.render("homepage", games);
});

router.get("/title/:title", async (req, res) => {
  const title = req.params.title;
  const url = `https://opencritic-api.p.rapidapi.com/game/search?criteria=${title}`;
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
  res.render("homepage", games);
});


module.exports = router;
