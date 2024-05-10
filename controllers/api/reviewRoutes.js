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
router.put('/:id', withAuth, async (req, res) => {

  try {
      const updatedReview = await Review.update(
          { description: req.body.description },
          { where: { id: req.params.id, user_id: req.session.user_id } }
      );
      if (updatedReview[0] > 0) { 
          res.json({ message: 'Review updated successfully' });
      } else {
          res.status(404).json({ message: 'No review found with this ID' });
      }
  } catch (err) {
      console.error('Error updating review:', err); 
      res.status(500).json({ error: 'Failed to update review' });
  }
});



//delete review
router.delete('/:id', withAuth, async (req, res) => {
  console.log('Received delete request for review ID:', req.params.id);  
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
      console.error('Error during review deletion:', error);  
      res.status(500).json({ error: 'Failed to delete review' });
  }
});



module.exports = router;

