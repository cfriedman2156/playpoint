const router = require("express").Router();
const { Review } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Updating a review
router.put("/:id", withAuth, async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [
        {
          model: Review,
          attributes: ["stars", "description"],
        },
      ],
    });
    const reviews = reviewData.map((review) => review.get({ plain: true }));

    // Ask Drew/Kyle about homepage (thinking of putting profile)...
    res.render("profile", {
      reviews,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete review
router.delete('/:id', withAuth, async (req, res) => {
  console.log('Received delete request for review ID:', req.params.id);  // Log the received ID
  try {
      const result = await Review.destroy({
          where: {
              id: req.params.id,
              user_id: req.session.user_id,
          }
      });
      if (result > 0) {
          res.json({ message: 'Review deleted successfully' });
      } else {
          res.status(404).send({ message: 'No review found with this ID' });
      }
  } catch (error) {
      console.error('Error during review deletion:', error);  // Log the error
      res.status(500).json({ error: 'Failed to delete review' });
  }
});



module.exports = router;

